import { describe, expect, it } from 'vitest';
import {
  ACCOUNT_CURRENCIES,
  currencySymbol,
  formatCurrency,
  PLACEHOLDER,
} from './format';

describe('account currencies', () => {
  it('writes the same amount in each supported currency', () => {
    expect(formatCurrency(1234.5, 'USD')).toContain('1,234.50');
    expect(formatCurrency(1234.5, 'EUR')).toContain('1,234.50');
    expect(formatCurrency(1234.5, 'GBP')).toContain('1,234.50');
  });

  it('uses a different symbol per currency rather than always a dollar sign', () => {
    const rendered = ACCOUNT_CURRENCIES.map((c) => formatCurrency(100, c.code));
    expect(new Set(rendered).size).toBe(ACCOUNT_CURRENCIES.length);
    expect(formatCurrency(100, 'EUR')).not.toContain('$');
    expect(formatCurrency(100, 'GBP')).toContain('£');
  });

  it('defaults to dollars when no currency is given, so existing callers are unaffected', () => {
    expect(formatCurrency(100)).toBe(formatCurrency(100, 'USD'));
    expect(formatCurrency(100)).toContain('$');
  });

  it('drops the decimals on whole amounts in every currency', () => {
    expect(formatCurrency(100, 'USD')).not.toContain('.00');
    expect(formatCurrency(100, 'EUR')).not.toContain('.00');
  });

  it('compacts millions with the right symbol', () => {
    expect(formatCurrency(2_500_000, 'EUR')).toBe('€2.5M');
    expect(formatCurrency(2_500_000, 'USD')).toBe('$2.5M');
  });

  it('still refuses to print a broken number', () => {
    expect(formatCurrency(Number.NaN, 'EUR')).toBe(PLACEHOLDER);
    expect(formatCurrency(Number.POSITIVE_INFINITY, 'GBP')).toBe(PLACEHOLDER);
    expect(formatCurrency(null, 'EUR')).toBe(PLACEHOLDER);
  });

  it('handles negatives, which is how losses are shown', () => {
    expect(formatCurrency(-250, 'EUR')).toContain('250');
    expect(formatCurrency(-250, 'EUR')).toContain('-');
  });

  it('exposes a symbol for every supported currency and falls back safely', () => {
    for (const currency of ACCOUNT_CURRENCIES) {
      expect(currencySymbol(currency.code).length).toBeGreaterThan(0);
    }
    expect(currencySymbol()).toBe('$');
  });
});
