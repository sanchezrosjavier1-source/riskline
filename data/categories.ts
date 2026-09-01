import type { Category, CategoryId } from '@/types/dictionary';

export const CATEGORIES: Category[] = [
  { id: 'basics', label: 'Basics', blurb: 'The vocabulary every other term is built on.' },
  { id: 'orders', label: 'Orders', blurb: 'How you actually tell a broker what to do.' },
  { id: 'risk', label: 'Risk Management', blurb: 'The math that decides whether you survive.' },
  { id: 'technical', label: 'Technical Analysis', blurb: 'Reading price on a chart.' },
  { id: 'indicators', label: 'Indicators', blurb: 'Calculations layered on top of price.' },
  { id: 'structure', label: 'Market Structure', blurb: 'How trends are built, and how they break.' },
  { id: 'stocks', label: 'Stocks', blurb: 'Equities, earnings and the numbers behind a share.' },
  { id: 'options', label: 'Options', blurb: 'Contracts, premiums and the Greeks.' },
  { id: 'forex', label: 'Forex', blurb: 'Currency pairs, pips and lots.' },
  { id: 'crypto', label: 'Crypto', blurb: 'Digital asset markets and perpetual futures.' },
  { id: 'psychology', label: 'Trading Psychology', blurb: 'The part of the process that is you.' },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = CATEGORIES.reduce(
  (map, category) => {
    map[category.id] = category;
    return map;
  },
  {} as Record<CategoryId, Category>,
);

export function categoryLabel(id: CategoryId): string {
  return CATEGORY_MAP[id]?.label ?? 'Trading';
}
