/**
 * Tells the IndexNow search engines which URLs exist, using the deployed
 * sitemap as the source of truth.
 *
 * Run it AFTER a deploy is live:
 *
 *   npm run indexnow
 *
 * Before the deploy the new URLs still 404, and a crawler that arrives on a
 * 404 does not politely come back later — it records the miss.
 *
 * All the parsing and batching lives in lib/indexnow.ts so it can be tested
 * without the network. This file is only the I/O around it.
 */
import {
  INDEXNOW_ENDPOINT,
  buildPayload,
  chunkUrls,
  describeStatus,
  keyLocation,
  parseSitemapUrls,
} from '../lib/indexnow.ts';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://stopsize.com').replace(/\/$/, '');
const dryRun = process.argv.includes('--dry-run');

async function main() {
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  process.stdout.write(`Reading ${sitemapUrl}\n`);

  const response = await fetch(sitemapUrl, { headers: { 'user-agent': 'stopsize-indexnow' } });
  if (!response.ok) {
    throw new Error(`Sitemap returned ${response.status}. Is the deploy live?`);
  }

  const urls = parseSitemapUrls(await response.text());
  if (urls.length === 0) throw new Error('Sitemap parsed to zero URLs — refusing to submit nothing.');

  // The key file has to be readable before the submission, or the API answers
  // 403 and the whole batch is wasted. Cheaper to find out here.
  const keyUrl = keyLocation(siteUrl);
  const keyResponse = await fetch(keyUrl);
  if (!keyResponse.ok) {
    throw new Error(`Key file ${keyUrl} returned ${keyResponse.status}. Deploy it before submitting.`);
  }

  const batches = chunkUrls(urls);
  process.stdout.write(`${urls.length} URLs in ${batches.length} request(s)\n`);

  if (dryRun) {
    process.stdout.write(`${urls.slice(0, 5).join('\n')}\n…\nDry run, nothing submitted.\n`);
    return;
  }

  for (const [index, batch] of batches.entries()) {
    const payload = buildPayload(siteUrl, batch);
    const submission = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    const { ok, message } = describeStatus(submission.status);
    process.stdout.write(`Batch ${index + 1}/${batches.length}: ${submission.status} — ${message}\n`);
    if (!ok) process.exitCode = 1;
  }
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
