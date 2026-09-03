import type { NewsItem, NewsSnapshot } from '@/types/news';

/**
 * A headline feed, assembled from the publishers' own RSS.
 *
 * What this shows is what an RSS feed is published for: the headline, the
 * one-line summary the publisher chose to syndicate, who wrote it, and a link
 * to read it on their site. Article text is never fetched or reproduced — the
 * whole point is to send the reader to the source.
 *
 * There is no editorial judgement here and the page says so. "Most important"
 * is not something a script can decide; what it can do is show the most recent
 * headlines from established finance desks, deduplicated.
 */

export const NEWS_COUNT = 9;
const WINDOW_DAYS = 7;
const REVALIDATE_SECONDS = 60 * 60;

interface Feed {
  url: string;
  source: string;
}

/**
 * Market and economics desks specifically. MarketWatch's general "top stories"
 * feed was tried and dropped: it mixes personal-finance advice columns in with
 * market coverage, which is not what someone sizing a trade came here for.
 */
export const FEEDS: Feed[] = [
  { url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html', source: 'CNBC' },
  { url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html', source: 'CNBC' },
  { url: 'https://www.cnbc.com/id/19746125/device/rss/rss.html', source: 'CNBC' },
  { url: 'https://feeds.content.dowjones.io/public/rss/mw_marketpulse', source: 'MarketWatch' },
];

// ---------------------------------------------------------------- pure parsing

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' ',
};

/** Turns feed text into something safe to render: entities decoded, tags stripped. */
export function decodeText(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&[a-z]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/\s+/g, ' ')
    .trim();
}

function firstTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1] : null;
}

/**
 * Extracts items from an RSS document. Deliberately tolerant: a malformed
 * entry is skipped rather than throwing, because one bad item should never
 * take down the page.
 */
export function parseRssItems(xml: string, source: string): NewsItem[] {
  if (typeof xml !== 'string' || !xml.includes('<item')) return [];

  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const items: NewsItem[] = [];

  for (const block of blocks) {
    // Publishers mark paid placements in the feed; those are not news.
    if (/<metadata:sponsored>\s*true\s*<\/metadata:sponsored>/i.test(block)) continue;

    const title = firstTag(block, 'title');
    const link = firstTag(block, 'link');
    const date = firstTag(block, 'pubDate');
    if (!title || !link) continue;

    const url = decodeText(link);
    const cleanTitle = decodeText(title);
    if (!url.startsWith('http') || cleanTitle.length === 0) continue;

    const publishedAt = date ? Date.parse(decodeText(date)) : Number.NaN;

    items.push({
      url,
      title: cleanTitle,
      summary: decodeText(firstTag(block, 'description') ?? ''),
      source,
      publishedAt: Number.isFinite(publishedAt) ? publishedAt : 0,
    });
  }

  return items;
}

/** Same story syndicated twice should appear once. Matched on URL, then on headline. */
export function dedupe(items: NewsItem[]): NewsItem[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const unique: NewsItem[] = [];

  for (const item of items) {
    const titleKey = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenUrls.has(item.url) || seenTitles.has(titleKey)) continue;
    seenUrls.add(item.url);
    seenTitles.add(titleKey);
    unique.push(item);
  }

  return unique;
}

/** Keeps only what was published inside the window, measured from `now`. */
export function withinWindow(items: NewsItem[], now: number, days = WINDOW_DAYS): NewsItem[] {
  const cutoff = now - days * 24 * 60 * 60 * 1000;
  return items.filter((item) => item.publishedAt >= cutoff && item.publishedAt <= now + 60_000);
}

/**
 * Fills the page while keeping more than one masthead on it.
 *
 * Sorting purely by recency lets whichever desk published most recently take
 * every slot, which reads like a single outlet's front page rather than a view
 * of the week. Each source gets a share first; whatever is left over is filled
 * by recency so the page is never short.
 */
export function balanceBySource(items: NewsItem[], count: number): NewsItem[] {
  if (items.length <= count) return items.slice(0, count);

  const sources = new Set(items.map((item) => item.source));
  const cap = Math.max(1, Math.ceil(count / sources.size));

  const taken: NewsItem[] = [];
  const used = new Map<string, number>();
  const overflow: NewsItem[] = [];

  for (const item of items) {
    const soFar = used.get(item.source) ?? 0;
    if (taken.length < count && soFar < cap) {
      taken.push(item);
      used.set(item.source, soFar + 1);
    } else {
      overflow.push(item);
    }
  }

  // A quiet source cannot leave the page short — recency fills the gap.
  for (const item of overflow) {
    if (taken.length >= count) break;
    taken.push(item);
  }

  return taken.sort((a, b) => b.publishedAt - a.publishedAt);
}

/**
 * The week's headlines: recent first, deduplicated, spread across publishers.
 * If the window is too thin to fill the page — a quiet week, or a feed outage —
 * it falls back to the most recent stories rather than showing three lonely items.
 */
export function selectStories(items: NewsItem[], now: number, count = NEWS_COUNT): NewsItem[] {
  const byRecency = dedupe(items).sort((a, b) => b.publishedAt - a.publishedAt);
  const thisWeek = withinWindow(byRecency, now);
  const pool = thisWeek.length >= count ? thisWeek : byRecency;
  return balanceBySource(pool, count);
}

/** "3 hours ago" — relative time reads better than a timestamp for news. */
export function relativeTime(publishedAt: number, now: number): string {
  const diff = now - publishedAt;
  if (!Number.isFinite(diff) || diff < 0) return 'just now';

  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

// ------------------------------------------------------------------- fetching

async function fetchFeed(feed: Feed): Promise<NewsItem[]> {
  try {
    const response = await fetch(feed.url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        accept: 'application/rss+xml, application/xml, text/xml',
        // Some publishers reject requests without a user agent outright.
        'user-agent': 'Mozilla/5.0 (compatible; StopSizeReader/1.0)',
      },
    });
    if (!response.ok) return [];
    return parseRssItems(await response.text(), feed.source);
  } catch {
    return [];
  }
}

export async function fetchNews(now = Date.now()): Promise<NewsSnapshot> {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const all = results.flat();

  return {
    items: selectStories(all, now),
    failed: all.length === 0,
    fetchedAt: now,
  };
}
