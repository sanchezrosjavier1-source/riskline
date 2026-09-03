import { describe, expect, it } from 'vitest';
import {
  decodeText,
  dedupe,
  FEEDS,
  NEWS_COUNT,
  parseRssItems,
  balanceBySource,
  relativeTime,
  selectStories,
  withinWindow,
} from './news';
import type { NewsItem } from '@/types/news';

const NOW = Date.parse('2026-09-03T12:00:00Z');
const hoursAgo = (h: number) => NOW - h * 60 * 60 * 1000;

function item(overrides: Partial<NewsItem> = {}): NewsItem {
  return {
    url: 'https://example.com/a',
    title: 'A headline',
    summary: 'A summary',
    source: 'CNBC',
    publishedAt: hoursAgo(1),
    ...overrides,
  };
}

/** Shaped like the real CNBC feed, including the sponsored flag. */
const SAMPLE_RSS = `<?xml version="1.0"?><rss><channel>
  <item>
    <link>https://www.cnbc.com/2026/09/03/china-g20.html</link>
    <title>China hits back at G20 statement, accusing them of &apos;promoting protectionism&apos;</title>
    <description><![CDATA[China rejected G20 pressure over export-driven growth.]]></description>
    <pubDate>Thu, 03 Sep 2026 11:12:54 GMT</pubDate>
  </item>
  <item>
    <link>https://www.cnbc.com/2026/09/02/yields.html</link>
    <title>Fed&#39;s Williams says yield surge reflects strong prospects</title>
    <description>Higher Treasury yields &amp; a strong economy</description>
    <pubDate>Wed, 02 Sep 2026 17:21:59 GMT</pubDate>
  </item>
  <item>
    <metadata:sponsored>true</metadata:sponsored>
    <link>https://www.cnbc.com/sponsored.html</link>
    <title>Paid placement</title>
    <pubDate>Wed, 02 Sep 2026 10:00:00 GMT</pubDate>
  </item>
</channel></rss>`;

describe('feed configuration', () => {
  it('reads from more than one publisher, so one outage is not fatal', () => {
    expect(FEEDS.length).toBeGreaterThan(1);
    expect(new Set(FEEDS.map((f) => f.source)).size).toBeGreaterThan(1);
  });

  it('every feed has an https url and a named source', () => {
    for (const feed of FEEDS) {
      expect(feed.url.startsWith('https://'), feed.url).toBe(true);
      expect(feed.source.length).toBeGreaterThan(0);
    }
  });
});

describe('decodeText', () => {
  it('unwraps CDATA', () => {
    expect(decodeText('<![CDATA[Hello world]]>')).toBe('Hello world');
  });

  it('decodes named, decimal and hex entities', () => {
    expect(decodeText('Fed&apos;s call')).toBe("Fed's call");
    expect(decodeText('oil &amp; gas')).toBe('oil & gas');
    expect(decodeText('Fed&#39;s call')).toBe("Fed's call");
    expect(decodeText('caf&#xe9;')).toBe('café');
  });

  it('strips markup so nothing from a feed can be rendered as HTML', () => {
    expect(decodeText('<b>Bold</b> text')).toBe('Bold text');
    expect(decodeText('<script>alert(1)</script>headline')).toBe('alert(1)headline');
  });

  it('collapses whitespace', () => {
    expect(decodeText('  too   many\n\nspaces ')).toBe('too many spaces');
  });
});

describe('parseRssItems', () => {
  const parsed = parseRssItems(SAMPLE_RSS, 'CNBC');

  it('reads title, link, summary and date', () => {
    expect(parsed[0].title).toBe(
      "China hits back at G20 statement, accusing them of 'promoting protectionism'",
    );
    expect(parsed[0].url).toBe('https://www.cnbc.com/2026/09/03/china-g20.html');
    expect(parsed[0].summary).toBe('China rejected G20 pressure over export-driven growth.');
    expect(parsed[0].publishedAt).toBe(Date.parse('Thu, 03 Sep 2026 11:12:54 GMT'));
  });

  it('drops sponsored placements, which are advertising rather than news', () => {
    expect(parsed).toHaveLength(2);
    expect(parsed.some((p) => p.title === 'Paid placement')).toBe(false);
  });

  it('tags every item with the publisher it came from', () => {
    for (const entry of parsed) expect(entry.source).toBe('CNBC');
  });

  it('returns nothing for junk instead of throwing', () => {
    expect(parseRssItems('', 'CNBC')).toEqual([]);
    expect(parseRssItems('<html>not a feed</html>', 'CNBC')).toEqual([]);
    expect(parseRssItems('not xml at all', 'CNBC')).toEqual([]);
  });

  it('skips entries missing a title or a usable link', () => {
    const broken = `<rss><item><title>No link</title></item>
      <item><link>ftp://nope</link><title>Bad scheme</title></item>
      <item><link>https://ok.com/x</link><title>Fine</title></item></rss>`;
    const result = parseRssItems(broken, 'CNBC');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Fine');
  });

  it('survives an entry with no date rather than dropping it', () => {
    const noDate = `<rss><item><link>https://ok.com/x</link><title>Undated</title></item></rss>`;
    expect(parseRssItems(noDate, 'CNBC')[0].publishedAt).toBe(0);
  });
});

describe('dedupe', () => {
  it('removes the same url twice', () => {
    expect(dedupe([item(), item()])).toHaveLength(1);
  });

  it('removes the same story syndicated under two urls', () => {
    const result = dedupe([
      item({ url: 'https://a.com/1', title: 'Fed holds rates steady' }),
      item({ url: 'https://b.com/2', title: 'Fed holds rates steady!' }),
    ]);
    expect(result).toHaveLength(1);
  });

  it('keeps genuinely different stories', () => {
    expect(
      dedupe([
        item({ url: 'https://a.com/1', title: 'Fed holds rates' }),
        item({ url: 'https://b.com/2', title: 'Oil falls 3%' }),
      ]),
    ).toHaveLength(2);
  });

  it('keeps the first occurrence, which is the more recent one after sorting', () => {
    const result = dedupe([
      item({ url: 'https://a.com/1', title: 'Same', source: 'CNBC' }),
      item({ url: 'https://b.com/2', title: 'Same', source: 'MarketWatch' }),
    ]);
    expect(result[0].source).toBe('CNBC');
  });
});

describe('withinWindow', () => {
  it('keeps this week and drops last month', () => {
    const result = withinWindow(
      [item({ publishedAt: hoursAgo(2) }), item({ url: 'b', publishedAt: hoursAgo(24 * 30) })],
      NOW,
    );
    expect(result).toHaveLength(1);
  });

  it('drops undated items rather than treating 1970 as recent', () => {
    expect(withinWindow([item({ publishedAt: 0 })], NOW)).toHaveLength(0);
  });

  it('tolerates a slightly future timestamp from a publisher clock', () => {
    expect(withinWindow([item({ publishedAt: NOW + 30_000 })], NOW)).toHaveLength(1);
  });
});

describe('selectStories', () => {
  const many = Array.from({ length: 30 }, (_, index) =>
    item({
      url: `https://example.com/${index}`,
      title: `Story ${index}`,
      publishedAt: hoursAgo(index),
    }),
  );

  it('returns exactly nine stories', () => {
    expect(selectStories(many, NOW)).toHaveLength(NEWS_COUNT);
    expect(NEWS_COUNT).toBe(9);
  });

  it('puts the most recent first', () => {
    const selected = selectStories(many, NOW);
    expect(selected[0].title).toBe('Story 0');
    for (let i = 1; i < selected.length; i += 1) {
      expect(selected[i - 1].publishedAt).toBeGreaterThanOrEqual(selected[i].publishedAt);
    }
  });

  it('falls back to older stories rather than showing a near-empty page', () => {
    const stale = Array.from({ length: 12 }, (_, index) =>
      item({
        url: `https://old.com/${index}`,
        title: `Old ${index}`,
        publishedAt: hoursAgo(24 * (30 + index)),
      }),
    );
    expect(selectStories(stale, NOW)).toHaveLength(NEWS_COUNT);
  });

  it('never invents items it does not have', () => {
    expect(selectStories([], NOW)).toEqual([]);
    expect(selectStories([item()], NOW)).toHaveLength(1);
  });
});

describe('relativeTime', () => {
  it('describes minutes, hours and days', () => {
    expect(relativeTime(NOW - 30_000, NOW)).toBe('just now');
    expect(relativeTime(hoursAgo(0.5), NOW)).toBe('30m ago');
    expect(relativeTime(hoursAgo(5), NOW)).toBe('5h ago');
    expect(relativeTime(hoursAgo(24), NOW)).toBe('yesterday');
    expect(relativeTime(hoursAgo(24 * 3), NOW)).toBe('3d ago');
  });

  it('does not print a negative age for a clock skew', () => {
    expect(relativeTime(NOW + 60_000, NOW)).toBe('just now');
  });
});

describe('balanceBySource', () => {
  const mixed = [
    ...Array.from({ length: 12 }, (_, i) =>
      item({ url: `https://mw.com/${i}`, title: `MW ${i}`, source: 'MarketWatch', publishedAt: hoursAgo(i) }),
    ),
    ...Array.from({ length: 12 }, (_, i) =>
      item({ url: `https://cnbc.com/${i}`, title: `CNBC ${i}`, source: 'CNBC', publishedAt: hoursAgo(i + 3) }),
    ),
  ];

  it('stops one publisher taking every slot just for publishing last', () => {
    const selected = balanceBySource(mixed, 9);
    const bySource = new Map<string, number>();
    for (const entry of selected) bySource.set(entry.source, (bySource.get(entry.source) ?? 0) + 1);
    expect(bySource.size).toBe(2);
    for (const used of bySource.values()) expect(used).toBeLessThanOrEqual(5);
  });

  it('still fills the page when only one publisher has anything', () => {
    const single = Array.from({ length: 20 }, (_, i) =>
      item({ url: `https://mw.com/${i}`, title: `Only ${i}`, source: 'MarketWatch', publishedAt: hoursAgo(i) }),
    );
    expect(balanceBySource(single, 9)).toHaveLength(9);
  });

  it('keeps the result in recency order', () => {
    const selected = balanceBySource(mixed, 9);
    for (let i = 1; i < selected.length; i += 1) {
      expect(selected[i - 1].publishedAt).toBeGreaterThanOrEqual(selected[i].publishedAt);
    }
  });

  it('returns everything untouched when there is less than a full page', () => {
    const few = mixed.slice(0, 4);
    expect(balanceBySource(few, 9)).toHaveLength(4);
  });

  it('spreads sources through selectStories too', () => {
    const sources = new Set(selectStories(mixed, NOW).map((s) => s.source));
    expect(sources.size).toBe(2);
  });
});
