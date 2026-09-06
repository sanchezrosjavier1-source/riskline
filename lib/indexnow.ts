/**
 * IndexNow: a ping that tells Bing, Yandex, Seznam and Naver which URLs
 * changed, instead of waiting for them to come back and notice.
 *
 * It does nothing for Google, which ignores the protocol. It also does nothing
 * for ranking — a crawler arriving sooner still has to decide the page is
 * worth showing. What it buys is time-to-index, which for a new domain is the
 * difference between a page being findable this afternoon or next week.
 *
 * The whole protocol is one POST. Everything here is pure so the parsing and
 * the batching can be tested without touching the network; scripts/indexnow.mjs
 * supplies the fetch.
 */

/**
 * Proof that whoever submits these URLs controls the domain: the same key has
 * to be readable at keyLocation. Public by design — it is not a secret, it is
 * a possession check, which is why it sits in the repo rather than in an env
 * var nobody would remember to set.
 */
export const INDEXNOW_KEY = 'af74eb5636d59f7f6a0f6aaca7944fa6';

/** The protocol caps a single submission at 10,000 URLs. */
export const MAX_URLS_PER_REQUEST = 10_000;

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Pulls the <loc> values out of a sitemap.
 *
 * Reading the deployed sitemap rather than rebuilding the URL list from the
 * data files means the submission can never disagree with what the site
 * actually serves — if a route is missing from the sitemap, it should be
 * missing here too, and the fix belongs in one place.
 */
export function parseSitemapUrls(xml: string): string[] {
  const urls: string[] = [];
  const pattern = /<loc>\s*([^<\s]+)\s*<\/loc>/g;

  for (const match of xml.matchAll(pattern)) {
    urls.push(decodeXmlEntities(match[1]));
  }

  return [...new Set(urls)];
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    // Ampersand last, so "&amp;lt;" does not decode twice into "<".
    .replace(/&amp;/g, '&');
}

/**
 * Drops anything that is not on the submitting host. A single foreign URL
 * makes the API reject the whole batch with a 422, so one bad entry would
 * otherwise cost every good one.
 */
export function urlsOnHost(urls: string[], host: string): string[] {
  return urls.filter((url) => {
    try {
      return new URL(url).host === host;
    } catch {
      return false;
    }
  });
}

export function chunkUrls(urls: string[], size = MAX_URLS_PER_REQUEST): string[][] {
  if (size < 1) throw new RangeError('chunk size must be at least 1');
  const chunks: string[][] = [];
  for (let i = 0; i < urls.length; i += size) chunks.push(urls.slice(i, i + size));
  return chunks;
}

export function keyLocation(siteUrl: string, key = INDEXNOW_KEY): string {
  return `${siteUrl.replace(/\/$/, '')}/${key}.txt`;
}

export function buildPayload(siteUrl: string, urls: string[], key = INDEXNOW_KEY): IndexNowPayload {
  const host = new URL(siteUrl).host;
  return {
    host,
    key,
    keyLocation: keyLocation(siteUrl, key),
    urlList: urlsOnHost(urls, host),
  };
}

/**
 * The API answers in status codes only, and two of them mean "fine" while
 * looking like they might not. Spelling them out here keeps the operator from
 * having to look up 202 every time.
 */
export function describeStatus(status: number): { ok: boolean; message: string } {
  switch (status) {
    case 200:
      return { ok: true, message: 'Accepted. The URLs are queued for crawling.' };
    case 202:
      return { ok: true, message: 'Accepted, key still being validated. This is normal on a first submission.' };
    case 400:
      return { ok: false, message: 'Bad request — the payload was malformed.' };
    case 403:
      return { ok: false, message: `Key rejected. Check that ${INDEXNOW_KEY}.txt is reachable and contains exactly the key.` };
    case 422:
      return { ok: false, message: 'URLs did not match the host, or the key did not match the schema.' };
    case 429:
      return { ok: false, message: 'Rate limited — too many submissions. Wait before retrying.' };
    default:
      return { ok: false, message: `Unexpected status ${status}.` };
  }
}
