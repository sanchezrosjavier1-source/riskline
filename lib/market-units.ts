import { isFiniteNumber, safeDivide } from './trade-math';

/**
 * The units each market actually thinks in.
 *
 * A stock trader says "my stop is $2 away". A forex trader says "50 pips", a
 * futures trader says "8 ticks", and a crypto trader may be sizing in
 * fractions with eight decimal places. The underlying position-size maths in
 * trade-math.ts is identical for all of them — this module only converts a
 * price distance into the language of the instrument.
 */

// ----------------------------------------------------------------- forex: pips

/** Pairs quoted in yen move in hundredths; everything else in ten-thousandths. */
export const PIP_SIZES = [
  { value: 0.0001, label: '0.0001', note: 'Most pairs (EUR/USD, GBP/USD…)' },
  { value: 0.01, label: '0.01', note: 'Yen pairs (USD/JPY, EUR/JPY…)' },
] as const;

export function pipsBetween(entry: number, stopLoss: number, pipSize: number): number | null {
  if (!isFiniteNumber(entry) || !isFiniteNumber(stopLoss) || !isFiniteNumber(pipSize)) return null;
  if (pipSize <= 0) return null;
  const distance = Math.abs(entry - stopLoss);
  return safeDivide(distance, pipSize);
}

/** Converts a pip distance back into a price distance, for the stop field. */
export function priceDistanceFromPips(pips: number, pipSize: number): number | null {
  if (!isFiniteNumber(pips) || !isFiniteNumber(pipSize) || pipSize <= 0) return null;
  return pips * pipSize;
}

/**
 * What each pip of movement costs, in the account's own currency.
 *
 * This sidesteps the usual quote-currency problem entirely: if the whole stop
 * is worth the risk budget, then one pip is worth the budget divided by the
 * number of pips. True for any pair and any account currency, with no
 * exchange rate needed.
 */
export function riskPerPip(maxRisk: number, pips: number | null): number | null {
  if (!isFiniteNumber(maxRisk) || pips === null || !isFiniteNumber(pips) || pips <= 0) return null;
  return safeDivide(maxRisk, pips);
}

export const LOT_UNITS = {
  standard: 100_000,
  mini: 10_000,
  micro: 1_000,
} as const;

export type LotName = keyof typeof LOT_UNITS;

export function lotsFromUnits(units: number, lot: LotName): number | null {
  if (!isFiniteNumber(units)) return null;
  return safeDivide(units, LOT_UNITS[lot]);
}

// --------------------------------------------------------------- futures: ticks

export interface ContractSpec {
  symbol: string;
  name: string;
  /** Smallest price increment the exchange allows. */
  tickSize: number;
  /** Account currency earned or lost per tick, per contract. */
  tickValue: number;
  /** Example price, so the page opens on something realistic. */
  examplePrice: number;
}

/**
 * Standard CME specifications. `pointValue` is deliberately derived rather
 * than stored — tickValue / tickSize is its definition, and storing both
 * invites them to disagree.
 */
export const CONTRACT_SPECS: ContractSpec[] = [
  { symbol: 'ES', name: 'E-mini S&P 500', tickSize: 0.25, tickValue: 12.5, examplePrice: 5000 },
  { symbol: 'MES', name: 'Micro E-mini S&P 500', tickSize: 0.25, tickValue: 1.25, examplePrice: 5000 },
  { symbol: 'NQ', name: 'E-mini Nasdaq-100', tickSize: 0.25, tickValue: 5, examplePrice: 18000 },
  { symbol: 'MNQ', name: 'Micro E-mini Nasdaq-100', tickSize: 0.25, tickValue: 0.5, examplePrice: 18000 },
  { symbol: 'YM', name: 'E-mini Dow', tickSize: 1, tickValue: 5, examplePrice: 40000 },
  { symbol: 'MYM', name: 'Micro E-mini Dow', tickSize: 1, tickValue: 0.5, examplePrice: 40000 },
  { symbol: 'RTY', name: 'E-mini Russell 2000', tickSize: 0.1, tickValue: 5, examplePrice: 2200 },
  { symbol: 'CL', name: 'Crude Oil', tickSize: 0.01, tickValue: 10, examplePrice: 78 },
  { symbol: 'GC', name: 'Gold', tickSize: 0.1, tickValue: 10, examplePrice: 2600 },
];

/** Account currency per full point of movement — tickValue per tick, scaled up. */
export function pointValue(spec: ContractSpec): number | null {
  return safeDivide(spec.tickValue, spec.tickSize);
}

export function ticksBetween(entry: number, stopLoss: number, tickSize: number): number | null {
  if (!isFiniteNumber(entry) || !isFiniteNumber(stopLoss) || !isFiniteNumber(tickSize)) return null;
  if (tickSize <= 0) return null;
  return safeDivide(Math.abs(entry - stopLoss), tickSize);
}

/** What the stop costs on a single contract, in account currency. */
export function riskPerContract(ticks: number | null, tickValue: number): number | null {
  if (ticks === null || !isFiniteNumber(ticks) || !isFiniteNumber(tickValue)) return null;
  const value = ticks * tickValue;
  return Number.isFinite(value) ? value : null;
}

export function findContract(symbol: string): ContractSpec | undefined {
  return CONTRACT_SPECS.find((spec) => spec.symbol === symbol.toUpperCase());
}

// ------------------------------------------------------------ crypto: satoshis

export const SATOSHIS_PER_COIN = 100_000_000;

export function toSatoshis(coins: number): number | null {
  if (!isFiniteNumber(coins)) return null;
  const sats = Math.round(coins * SATOSHIS_PER_COIN);
  return Number.isFinite(sats) ? sats : null;
}

/**
 * Crypto position sizes routinely land below a whole coin, where two decimal
 * places would round a real position to "0.00". Precision follows magnitude
 * so a size is never displayed as nothing.
 */
export function formatCoinSize(size: number | null | undefined): string {
  if (!isFiniteNumber(size)) return '—';
  const magnitude = Math.abs(size);
  let decimals = 2;
  if (magnitude < 0.0001) decimals = 8;
  else if (magnitude < 0.01) decimals = 6;
  else if (magnitude < 1) decimals = 4;
  return size.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/** Groups satoshis for readability: 2,450,000 sats. */
export function formatSatoshis(sats: number | null): string {
  if (sats === null || !isFiniteNumber(sats)) return '—';
  return sats.toLocaleString('en-US', { maximumFractionDigits: 0 });
}
