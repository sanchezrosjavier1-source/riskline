import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/dictionary';
import { getAllGuideSlugs } from '@/lib/guides';
import { getAllHistorySlugs } from '@/lib/history';
import { allAssetIds } from '@/lib/markets';
import { getAllMarketCalculatorSlugs } from '@/data/market-calculators';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    {
      url: `${SITE.url}/tools/position-size`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/tools/risk-reward`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: `${SITE.url}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/markets`, lastModified: now, changeFrequency: 'hourly', priority: 0.85 },
    { url: `${SITE.url}/journal`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/news`, lastModified: now, changeFrequency: 'hourly', priority: 0.8 },
    {
      url: `${SITE.url}/trading-dictionary`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${SITE.url}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    {
      url: `${SITE.url}/market-history`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: `${SITE.url}/learn`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const termRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${SITE.url}/trading-dictionary/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = getAllGuideSlugs().map((slug) => ({
    url: `${SITE.url}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const historyRoutes: MetadataRoute.Sitemap = getAllHistorySlugs().map((slug) => ({
    url: `${SITE.url}/market-history/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.65,
  }));

  // Market-specific calculators carry the highest-intent search terms.
  const marketCalculatorRoutes: MetadataRoute.Sitemap = getAllMarketCalculatorSlugs().map((slug) => ({
    url: `${SITE.url}/calculator/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.95,
  }));

  const assetRoutes: MetadataRoute.Sitemap = allAssetIds().map((id) => ({
    url: `${SITE.url}/markets/${id}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...marketCalculatorRoutes,
    ...termRoutes,
    ...guideRoutes,
    ...historyRoutes,
    ...assetRoutes,
  ];
}
