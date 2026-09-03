import { describe, expect, it } from 'vitest';
import {
  getAllMarketCalculatorSlugs,
  getMarketCalculatorPage,
  MARKET_CALCULATOR_PAGES,
} from '@/data/market-calculators';
import { TERM_MAP } from './dictionary';
import { buildTitle, BRAND_SUFFIX_LENGTH, MAX_TITLE } from './seo';
import { calculateTrade } from './trade-math';
import { CONTRACT_SPECS, pointValue } from './market-units';

describe('market calculator pages', () => {
  it('covers forex, futures and crypto', () => {
    expect(getAllMarketCalculatorSlugs().sort()).toEqual(['crypto', 'forex', 'futures']);
  });

  it('has unique slugs and unique titles', () => {
    const slugs = MARKET_CALCULATOR_PAGES.map((p) => p.slug);
    const titles = MARKET_CALCULATOR_PAGES.map((p) => p.title);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('uses URL-safe slugs', () => {
    for (const page of MARKET_CALCULATOR_PAGES) {
      expect(page.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('resolves a known slug and returns undefined for anything else', () => {
    expect(getMarketCalculatorPage('forex')?.market).toBe('forex');
    expect(getMarketCalculatorPage('stocks')).toBeUndefined();
    expect(getMarketCalculatorPage('')).toBeUndefined();
  });
});

describe('every page has real content', () => {
  it.each(MARKET_CALCULATOR_PAGES.map((p) => [p.slug, p] as const))(
    '%s is substantial',
    (_slug, page) => {
      expect(page.dek.length).toBeGreaterThan(60);
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      expect(page.faq.length).toBeGreaterThanOrEqual(3);
      expect(page.relatedTerms.length).toBeGreaterThanOrEqual(3);
      expect(page.keywords.length).toBeGreaterThanOrEqual(3);

      for (const section of page.sections) {
        expect(section.heading.length).toBeGreaterThan(10);
        expect(section.body.length).toBeGreaterThanOrEqual(2);
        for (const paragraph of section.body) expect(paragraph.length).toBeGreaterThan(120);
      }

      for (const entry of page.faq) {
        expect(entry.question.endsWith('?'), entry.question).toBe(true);
        expect(entry.answer.length).toBeGreaterThan(80);
      }
    },
  );

  it('has no placeholder text', () => {
    const banned = /lorem ipsum|coming soon|tbd\b|todo\b|placeholder/i;
    for (const page of MARKET_CALCULATOR_PAGES) {
      const blob = [
        page.dek,
        ...page.sections.flatMap((s) => [s.heading, ...s.body]),
        ...page.faq.flatMap((f) => [f.question, f.answer]),
      ].join(' ');
      expect(blob, page.slug).not.toMatch(banned);
    }
  });

  it('never promises an outcome', () => {
    const banned = /guaranteed|will definitely|risk-free profit|can't lose|sure thing/i;
    for (const page of MARKET_CALCULATOR_PAGES) {
      const blob = [page.dek, ...page.sections.flatMap((s) => s.body)].join(' ');
      expect(blob, page.slug).not.toMatch(banned);
    }
  });
});

describe('internal linking', () => {
  it('links only to dictionary terms that exist', () => {
    for (const page of MARKET_CALCULATOR_PAGES) {
      for (const slug of page.relatedTerms) {
        expect(TERM_MAP.has(slug), `${page.slug} links to missing term "${slug}"`).toBe(true);
      }
    }
  });

  it('does not repeat a term within one page', () => {
    for (const page of MARKET_CALCULATOR_PAGES) {
      expect(new Set(page.relatedTerms).size).toBe(page.relatedTerms.length);
    }
  });
});

describe('SEO fits search results', () => {
  it.each(MARKET_CALCULATOR_PAGES.map((p) => [p.slug, p] as const))(
    '%s title fits',
    (_slug, page) => {
      const title = buildTitle(page.metaTitle, []);
      expect(title.length + BRAND_SUFFIX_LENGTH).toBeLessThanOrEqual(MAX_TITLE);
    },
  );

  it.each(MARKET_CALCULATOR_PAGES.map((p) => [p.slug, p] as const))(
    '%s description fits',
    (_slug, page) => {
      expect(page.metaDescription.length).toBeLessThanOrEqual(158);
      expect(page.metaDescription.length).toBeGreaterThan(70);
    },
  );

  it('targets a different keyword set on each page', () => {
    const [forex, futures, crypto] = MARKET_CALCULATOR_PAGES.map((p) => new Set(p.keywords));
    expect([...forex].some((k) => futures.has(k))).toBe(false);
    expect([...futures].some((k) => crypto.has(k))).toBe(false);
  });
});

describe('worked examples are actually valid trades', () => {
  it.each(MARKET_CALCULATOR_PAGES.map((p) => [p.slug, p] as const))(
    '%s opens on a trade that calculates',
    (_slug, page) => {
      const multiplier =
        page.market === 'futures' ? (pointValue(CONTRACT_SPECS[0]) ?? 1) : undefined;

      const result = calculateTrade({
        accountSize: page.example.accountSize,
        riskPercent: page.example.riskPercent,
        direction: 'long',
        entry: page.example.entry,
        stopLoss: page.example.stopLoss,
        takeProfit: page.example.takeProfit,
        contractMultiplier: multiplier,
      });

      expect(result.valid, `${page.slug} example does not calculate`).toBe(true);
      expect(result.positionSize).toBeGreaterThan(0);
      expect(Number.isFinite(result.positionSize)).toBe(true);
    },
  );

  it('places the example stop below the entry and the target above it', () => {
    for (const page of MARKET_CALCULATOR_PAGES) {
      expect(page.example.stopLoss, page.slug).toBeLessThan(page.example.entry);
      expect(page.example.takeProfit, page.slug).toBeGreaterThan(page.example.entry);
    }
  });

  it('shows a futures example that fits the account, so the page does not open on a warning', () => {
    const futures = getMarketCalculatorPage('futures')!;
    const result = calculateTrade({
      accountSize: futures.example.accountSize,
      riskPercent: futures.example.riskPercent,
      direction: 'long',
      entry: futures.example.entry,
      stopLoss: futures.example.stopLoss,
      takeProfit: futures.example.takeProfit,
      contractMultiplier: pointValue(CONTRACT_SPECS[0])!,
    });
    expect(result.positionSize).toBeGreaterThanOrEqual(1);
  });
});
