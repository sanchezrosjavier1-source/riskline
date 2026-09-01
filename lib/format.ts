import { isFiniteNumber } from './trade-math';

/** What we print instead of NaN, Infinity or undefined. Never show those. */
export const PLACEHOLDER = '—';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

/** Money, always with a currency symbol. Whole dollars when the cents are zero. */
export function formatCurrency(value: number | null | undefined): string {
  if (!isFiniteNumber(value)) return PLACEHOLDER;
  if (Math.abs(value) >= 1_000_000) return `$${compact.format(value)}`;
  if (Number.isInteger(value)) return currencyWhole.format(value);
  return currency.format(value);
}

/**
 * Prices need more precision than money totals: a forex pair moves in the
 * fourth decimal and a micro-cap crypto in the eighth.
 */
export function formatPrice(value: number | null | undefined): string {
  if (!isFiniteNumber(value)) return PLACEHOLDER;
  const magnitude = Math.abs(value);
  let decimals = 2;
  if (magnitude > 0 && magnitude < 0.01) decimals = 6;
  else if (magnitude < 1) decimals = 4;
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/** Position sizes: whole numbers stay clean, fractional sizes keep enough digits to be useful. */
export function formatUnits(value: number | null | undefined): string {
  if (!isFiniteNumber(value)) return PLACEHOLDER;
  const magnitude = Math.abs(value);
  if (magnitude >= 1_000_000) return compact.format(value);
  if (Number.isInteger(value)) return value.toLocaleString('en-US');
  const decimals = magnitude < 1 ? 4 : 2;
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number | null | undefined, decimals = 2): string {
  if (!isFiniteNumber(value)) return PLACEHOLDER;
  const magnitude = Math.abs(value);
  const places = magnitude >= 100 ? 0 : magnitude < 0.1 ? 3 : decimals;
  return `${value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: places,
  })}%`;
}

/** A risk/reward ratio is read as "1 : 3", so we normalize risk to 1. */
export function formatRatio(value: number | null | undefined): string {
  if (!isFiniteNumber(value) || value <= 0) return PLACEHOLDER;
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 100) / 100;
  return `1 : ${rounded.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

export function formatNumber(value: number | null | undefined, decimals = 2): string {
  if (!isFiniteNumber(value)) return PLACEHOLDER;
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Parses what a person actually types into a number input: "1,000", "$50",
 * " 2.5 ". Returns null for anything that is not a usable number, so the
 * caller can decide whether that is an empty field or an error.
 */
export function parseNumericInput(raw: string): number | null {
  if (typeof raw !== 'string') return null;
  const cleaned = raw.replace(/[$,\s_]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '.' || cleaned === '-.') return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Trims trailing zeros so a formula reads "$2" rather than "$2.00". */
export function formatCompactPrice(value: number | null | undefined): string {
  if (!isFiniteNumber(value)) return PLACEHOLDER;
  if (Number.isInteger(value)) return `$${value.toLocaleString('en-US')}`;
  return formatPrice(value);
}
