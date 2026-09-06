import { describe, expect, it } from 'vitest';
import {
  INDEXNOW_KEY,
  MAX_URLS_PER_REQUEST,
  buildPayload,
  chunkUrls,
  describeStatus,
  keyLocation,
  parseSitemapUrls,
  urlsOnHost,
} from './indexnow';
import { SITE } from './site';

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://stopsize.com/</loc><lastmod>2026-09-06</lastmod></url>
  <url>
    <loc>https://stopsize.com/calculator</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url><loc>https://stopsize.com/trading-dictionary/pip</loc></url>
</urlset>`;

describe('parseSitemapUrls', () => {
  it('reads every loc, whatever the surrounding whitespace', () => {
    expect(parseSitemapUrls(SITEMAP)).toEqual([
      'https://stopsize.com/',
      'https://stopsize.com/calculator',
      'https://stopsize.com/trading-dictionary/pip',
    ]);
  });

  it('returns nothing for a sitemap with no entries', () => {
    expect(parseSitemapUrls('<urlset></urlset>')).toEqual([]);
  });

  it('de-duplicates, so a URL listed twice is submitted once', () => {
    const doubled = `<url><loc>https://stopsize.com/faq</loc></url><url><loc>https://stopsize.com/faq</loc></url>`;
    expect(parseSitemapUrls(doubled)).toEqual(['https://stopsize.com/faq']);
  });

  it('decodes escaped query strings', () => {
    const xml = '<url><loc>https://stopsize.com/markets?a=1&amp;b=2</loc></url>';
    expect(parseSitemapUrls(xml)).toEqual(['https://stopsize.com/markets?a=1&b=2']);
  });
});

describe('urlsOnHost', () => {
  it('keeps only URLs on the submitting host', () => {
    // One foreign URL makes the API reject the entire batch, so a stray entry
    // would otherwise cost every valid URL alongside it.
    const mixed = [
      'https://stopsize.com/faq',
      'https://example.com/faq',
      'https://blog.stopsize.com/post',
    ];
    expect(urlsOnHost(mixed, 'stopsize.com')).toEqual(['https://stopsize.com/faq']);
  });

  it('drops anything that is not a URL at all', () => {
    expect(urlsOnHost(['/relative', '', 'stopsize.com/faq'], 'stopsize.com')).toEqual([]);
  });
});

describe('chunkUrls', () => {
  it('leaves a small list in one request', () => {
    expect(chunkUrls(['a', 'b', 'c'])).toEqual([['a', 'b', 'c']]);
  });

  it('splits at the protocol limit', () => {
    const urls = Array.from({ length: MAX_URLS_PER_REQUEST + 5 }, (_, i) => `https://x/${i}`);
    const chunks = chunkUrls(urls);
    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toHaveLength(MAX_URLS_PER_REQUEST);
    expect(chunks[1]).toHaveLength(5);
  });

  it('returns nothing for an empty list rather than one empty request', () => {
    expect(chunkUrls([])).toEqual([]);
  });

  it('refuses a chunk size that would never terminate', () => {
    expect(() => chunkUrls(['a'], 0)).toThrow(RangeError);
  });
});

describe('buildPayload', () => {
  it('names the host and the key file the crawler will check', () => {
    const payload = buildPayload('https://stopsize.com', ['https://stopsize.com/faq']);
    expect(payload.host).toBe('stopsize.com');
    expect(payload.key).toBe(INDEXNOW_KEY);
    expect(payload.keyLocation).toBe(`https://stopsize.com/${INDEXNOW_KEY}.txt`);
    expect(payload.urlList).toEqual(['https://stopsize.com/faq']);
  });

  it('tolerates a trailing slash on the site URL', () => {
    expect(keyLocation('https://stopsize.com/')).toBe(`https://stopsize.com/${INDEXNOW_KEY}.txt`);
  });
});

describe('the key', () => {
  it('matches the schema the protocol accepts', () => {
    // 8-128 characters, hexadecimal only.
    expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{8,128}$/);
  });

  it('points at the site the rest of the app knows about', () => {
    expect(keyLocation(SITE.url).startsWith(SITE.url)).toBe(true);
  });
});

describe('describeStatus', () => {
  it('treats 200 and 202 as success', () => {
    expect(describeStatus(200).ok).toBe(true);
    // 202 means "key not validated yet", which is what a first submission gets.
    expect(describeStatus(202).ok).toBe(true);
  });

  it.each([400, 403, 422, 429, 500])('treats %i as a failure worth reading', (status) => {
    const result = describeStatus(status);
    expect(result.ok).toBe(false);
    expect(result.message.length).toBeGreaterThan(10);
  });

  it('names the key file when the key is rejected', () => {
    expect(describeStatus(403).message).toContain(INDEXNOW_KEY);
  });
});
