'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Download,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Button } from '@/components/ui/Button';
import { JournalDashboard } from './JournalDashboard';
import {
  computeStats,
  createTradeId,
  filterTrades,
  outcomeOf,
  parseTrades,
  rMultiple,
  sortChronologically,
  strategiesUsed,
  toCsv,
} from '@/lib/journal';
import { formatCurrency, formatNumber, PLACEHOLDER } from '@/lib/format';
import { useLocalState } from '@/lib/hooks';
import type { JournalTrade, TradeOutcome } from '@/types/journal';
import type { Direction, Market } from '@/types/trade';

const TRADES_KEY = 'stopsize:journal:trades';
const CAPITAL_KEY = 'stopsize:journal:capital';

const MARKET_OPTIONS: Array<{ value: Market; label: string }> = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'forex', label: 'Forex' },
  { value: 'futures', label: 'Futures' },
  { value: 'crypto', label: 'Crypto' },
];

const OUTCOME_FILTERS: Array<{ value: TradeOutcome | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'win', label: 'Wins' },
  { value: 'loss', label: 'Losses' },
  { value: 'open', label: 'Open' },
];

const OUTCOME_STYLES: Record<TradeOutcome, string> = {
  win: 'border-reward/40 bg-reward-wash text-reward-soft',
  loss: 'border-risk/40 bg-risk-wash text-risk-soft',
  breakeven: 'border-line text-ink-muted',
  open: 'border-accent/40 bg-accent-wash text-accent-soft',
};

interface FormState {
  id: string | null;
  symbol: string;
  market: Market;
  direction: Direction;
  date: string;
  entry: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  positionSize: number | null;
  riskAmount: number | null;
  exit: number | null;
  pnl: number | null;
  strategy: string;
  setup: string;
  tags: string;
  emotion: string;
  notes: string;
}

function emptyForm(): FormState {
  return {
    id: null,
    symbol: '',
    market: 'stocks',
    direction: 'long',
    date: new Date().toISOString().slice(0, 10),
    entry: null,
    stopLoss: null,
    takeProfit: null,
    positionSize: null,
    riskAmount: null,
    exit: null,
    pnl: null,
    strategy: '',
    setup: '',
    tags: '',
    emotion: '',
    notes: '',
  };
}

function formFromTrade(trade: JournalTrade): FormState {
  return {
    id: trade.id,
    symbol: trade.symbol,
    market: trade.market,
    direction: trade.direction,
    date: trade.date,
    entry: trade.entry,
    stopLoss: trade.stopLoss,
    takeProfit: trade.takeProfit,
    positionSize: trade.positionSize,
    riskAmount: trade.riskAmount,
    exit: trade.exit,
    pnl: trade.pnl,
    strategy: trade.strategy,
    setup: trade.setup,
    tags: trade.tags.join(', '),
    emotion: trade.emotion,
    notes: trade.notes,
  };
}

/** Theoretical P&L from an exit price, offered as a starting point the trader can correct. */
function pnlFromExit(form: FormState): number | null {
  const { entry, exit, positionSize, direction } = form;
  if (entry === null || exit === null || positionSize === null) return null;
  const perUnit = direction === 'long' ? exit - entry : entry - exit;
  const value = perUnit * positionSize;
  return Number.isFinite(value) ? Number(value.toFixed(2)) : null;
}

const textInputClass =
  'h-10 w-full rounded-xl border border-line bg-base-sunken/60 px-3 text-sm text-ink placeholder:text-ink-ghost transition-colors hover:border-line-strong focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20';

export function JournalApp() {
  const [trades, setTrades, tradesReady] = useLocalState<JournalTrade[]>(
    TRADES_KEY,
    [],
    (raw) => parseTrades(raw),
  );
  const [capital, setCapital] = useLocalState<number>(CAPITAL_KEY, 10000);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const [query, setQuery] = useState('');
  const [outcome, setOutcome] = useState<TradeOutcome | 'all'>('all');
  const [strategy, setStrategy] = useState<string>('all');

  const stats = useMemo(() => computeStats(trades, capital), [trades, capital]);

  const visible = useMemo(() => {
    const filtered = filterTrades(trades, { query, outcome, strategy });
    return sortChronologically(filtered).reverse();
  }, [trades, query, outcome, strategy]);

  const strategyOptions = useMemo(() => strategiesUsed(trades), [trades]);

  const canSave =
    form.symbol.trim().length > 0 &&
    form.entry !== null &&
    form.stopLoss !== null &&
    form.positionSize !== null &&
    form.riskAmount !== null &&
    form.riskAmount > 0;

  const openForm = (trade?: JournalTrade) => {
    setForm(trade ? formFromTrade(trade) : emptyForm());
    setShowContext(Boolean(trade && (trade.strategy || trade.notes || trade.tags.length)));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setForm(emptyForm());
  };

  const save = () => {
    if (!canSave) return;

    const record: JournalTrade = {
      id: form.id ?? createTradeId(),
      createdAt: new Date().toISOString(),
      symbol: form.symbol.trim().toUpperCase(),
      market: form.market,
      direction: form.direction,
      entry: form.entry as number,
      stopLoss: form.stopLoss as number,
      takeProfit: form.takeProfit,
      positionSize: form.positionSize as number,
      riskAmount: form.riskAmount as number,
      // Derived so the trader never has to compute it, but only when a capital
      // figure exists to divide by.
      riskPercent: capital > 0 ? ((form.riskAmount as number) / capital) * 100 : null,
      exit: form.exit,
      pnl: form.pnl,
      date: form.date,
      strategy: form.strategy.trim(),
      setup: form.setup.trim(),
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      notes: form.notes.trim(),
      emotion: form.emotion.trim(),
    };

    setTrades((prev) => {
      const existing = prev.findIndex((t) => t.id === record.id);
      if (existing === -1) return [...prev, record];
      const next = [...prev];
      next[existing] = { ...record, createdAt: prev[existing].createdAt };
      return next;
    });

    closeForm();
  };

  const remove = (id: string) => {
    setTrades((prev) => prev.filter((trade) => trade.id !== id));
  };

  const exportCsv = () => {
    const blob = new Blob([toCsv(trades)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stopsize-journal-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* -------------------------------------------------------------- header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="w-full max-w-[13rem]">
          <NumberField
            label="Starting Capital"
            value={capital}
            onChange={(value) => setCapital(value ?? 0)}
            prefix="$"
            step={1000}
            min={0}
            size="sm"
          />
        </div>
        <div className="flex gap-2">
          {trades.length > 0 && (
            <Button variant="secondary" size="sm" onClick={exportCsv}>
              <Download size={13} aria-hidden />
              Export CSV
            </Button>
          )}
          <Button size="sm" onClick={() => openForm()}>
            <Plus size={13} aria-hidden />
            Log a trade
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- form */}
      {formOpen && (
        <section className="panel p-5" aria-label={form.id ? 'Edit trade' : 'Log a trade'}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-ink">
              {form.id ? 'Edit trade' : 'Log a trade'}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              aria-label="Close"
              className="rounded-lg p-1 text-ink-ghost transition-colors hover:bg-white/[0.04] hover:text-ink-muted"
            >
              <X size={15} aria-hidden />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="journal-symbol" className="label mb-2 block">
                Symbol
              </label>
              <input
                id="journal-symbol"
                value={form.symbol}
                onChange={(event) => setForm({ ...form, symbol: event.target.value })}
                placeholder="AAPL"
                className={textInputClass}
              />
            </div>

            <div>
              <label htmlFor="journal-date" className="label mb-2 block">
                Date
              </label>
              <input
                id="journal-date"
                type="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
                className={textInputClass}
              />
            </div>

            <Segmented
              label="Direction"
              value={form.direction}
              onChange={(value) => setForm({ ...form, direction: value })}
              options={[
                { value: 'long', label: 'LONG', tone: 'reward' },
                { value: 'short', label: 'SHORT', tone: 'risk' },
              ]}
            />

            <div>
              <span className="label mb-2 block">Market</span>
              <div className="grid grid-cols-4 gap-1 rounded-xl border border-line bg-base-sunken/60 p-1.5">
                {MARKET_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={form.market === option.value}
                    onClick={() => setForm({ ...form, market: option.value })}
                    className={`rounded-lg px-1 py-1.5 text-2xs transition-all duration-200 ${
                      form.market === option.value
                        ? 'bg-accent-wash text-accent-soft'
                        : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <NumberField
              label="Entry"
              value={form.entry}
              onChange={(value) => setForm({ ...form, entry: value })}
              prefix="$"
              step={0.5}
              min={0}
              size="sm"
            />
            <NumberField
              label="Stop Loss"
              value={form.stopLoss}
              onChange={(value) => setForm({ ...form, stopLoss: value })}
              prefix="$"
              step={0.5}
              min={0}
              size="sm"
            />
            <NumberField
              label="Position Size"
              value={form.positionSize}
              onChange={(value) => setForm({ ...form, positionSize: value })}
              step={1}
              min={0}
              size="sm"
            />
            <NumberField
              label="Risk Amount"
              value={form.riskAmount}
              onChange={(value) => setForm({ ...form, riskAmount: value })}
              prefix="$"
              step={25}
              min={0}
              size="sm"
              hint={
                capital > 0 && form.riskAmount
                  ? `${formatNumber((form.riskAmount / capital) * 100, 2)}% of capital`
                  : 'What you actually had at risk'
              }
            />
          </div>

          <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField
              label="Exit"
              value={form.exit}
              onChange={(value) => {
                const next = { ...form, exit: value };
                // Fills P&L as a convenience; the trader can overwrite it with
                // the real figure once fees and slippage are known.
                setForm({ ...next, pnl: pnlFromExit(next) ?? form.pnl });
              }}
              prefix="$"
              step={0.5}
              min={0}
              optional
              size="sm"
              hint="Leave empty while the trade is open"
            />
            <NumberField
              label="Profit / Loss"
              value={form.pnl}
              onChange={(value) => setForm({ ...form, pnl: value })}
              prefix="$"
              step={25}
              optional
              size="sm"
              hint={
                form.pnl !== null && form.riskAmount
                  ? `${formatNumber(form.pnl / form.riskAmount, 2)}R`
                  : 'Net, after costs'
              }
            />
          </div>

          {/* ------------------------------------------------------- context */}
          <div className="mt-4 border-t border-line pt-4">
            <button
              type="button"
              aria-expanded={showContext}
              onClick={() => setShowContext((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/[0.03]"
            >
              <span className="text-xs font-medium text-ink-muted">
                Strategy, tags and notes
              </span>
              <ChevronDown
                size={14}
                aria-hidden
                className={`shrink-0 text-ink-faint transition-transform duration-300 ${
                  showContext ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {showContext && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="journal-strategy" className="label mb-2 block">
                  Strategy
                </label>
                <input
                  id="journal-strategy"
                  value={form.strategy}
                  onChange={(event) => setForm({ ...form, strategy: event.target.value })}
                  placeholder="Breakout"
                  className={textInputClass}
                />
              </div>
              <div>
                <label htmlFor="journal-setup" className="label mb-2 block">
                  Setup
                </label>
                <input
                  id="journal-setup"
                  value={form.setup}
                  onChange={(event) => setForm({ ...form, setup: event.target.value })}
                  placeholder="Range break on volume"
                  className={textInputClass}
                />
              </div>
              <div>
                <label htmlFor="journal-tags" className="label mb-2 block">
                  Tags
                </label>
                <input
                  id="journal-tags"
                  value={form.tags}
                  onChange={(event) => setForm({ ...form, tags: event.target.value })}
                  placeholder="gap-up, earnings"
                  className={textInputClass}
                />
              </div>
              <div>
                <label htmlFor="journal-emotion" className="label mb-2 block">
                  How it felt
                </label>
                <input
                  id="journal-emotion"
                  value={form.emotion}
                  onChange={(event) => setForm({ ...form, emotion: event.target.value })}
                  placeholder="Impatient, chased the entry"
                  className={textInputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="journal-notes" className="label mb-2 block">
                  Notes
                </label>
                <textarea
                  id="journal-notes"
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                  rows={3}
                  placeholder="What you saw, what you would do differently."
                  className={`${textInputClass} h-auto py-2.5`}
                />
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2">
            <Button onClick={save} disabled={!canSave}>
              {form.id ? 'Save changes' : 'Add trade'}
            </Button>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            {!canSave && (
              <span className="text-2xs text-ink-ghost">
                Symbol, entry, stop, size and risk are required.
              </span>
            )}
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- dashboard */}
      {trades.length > 0 && <JournalDashboard stats={stats} trades={trades} />}

      {/* --------------------------------------------------------------- list */}
      <section aria-labelledby="trade-history">
        <h2 id="trade-history" className="label mb-3">
          Trade history
        </h2>

        {tradesReady && trades.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="text-sm text-ink">No trades logged yet</p>
            <p className="mx-auto mt-2 max-w-[46ch] text-xs leading-relaxed text-ink-faint">
              Log the trades you take and this page turns into your win rate, your average R, your
              drawdown and which of your strategies actually makes money. It stays on this device —
              no account, nothing uploaded.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button size="sm" onClick={() => openForm()}>
                <Plus size={13} aria-hidden />
                Log your first trade
              </Button>
              <Link
                href="/calculator"
                className="inline-flex h-9 items-center rounded-xl border border-line px-3.5 text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                Size one first
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[12rem] flex-1">
                <Search
                  size={14}
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-ghost"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search symbol, strategy, notes…"
                  aria-label="Search trades"
                  className={`${textInputClass} pl-9`}
                />
              </div>

              <div className="flex gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
                {OUTCOME_FILTERS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={outcome === option.value}
                    onClick={() => setOutcome(option.value)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs transition-all duration-200 ${
                      outcome === option.value
                        ? 'bg-accent-wash text-accent-soft'
                        : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {strategyOptions.length > 1 && (
                <select
                  value={strategy}
                  onChange={(event) => setStrategy(event.target.value)}
                  aria-label="Filter by strategy"
                  className={`${textInputClass} w-auto`}
                >
                  <option value="all">All strategies</option>
                  {strategyOptions.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {visible.length === 0 ? (
              <p className="mt-4 rounded-xl border border-line bg-base-raised/30 p-6 text-center text-sm text-ink-faint">
                No trades match those filters.
              </p>
            ) : (
              <ul className="mt-4 space-y-1.5">
                {visible.map((trade) => {
                  const result = outcomeOf(trade);
                  const r = rMultiple(trade);
                  return (
                    <li key={trade.id}>
                      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-base-raised/40 p-3.5 transition-colors hover:border-line-strong">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="display-num text-sm font-medium text-ink">
                              {trade.symbol}
                            </span>
                            <span
                              className={`rounded-md border px-1.5 py-0.5 text-2xs ${
                                trade.direction === 'long'
                                  ? 'border-reward/30 text-reward-soft'
                                  : 'border-risk/30 text-risk-soft'
                              }`}
                            >
                              {trade.direction === 'long' ? 'LONG' : 'SHORT'}
                            </span>
                            <span
                              className={`rounded-md border px-1.5 py-0.5 text-2xs ${OUTCOME_STYLES[result]}`}
                            >
                              {result === 'breakeven' ? 'BE' : result.toUpperCase()}
                            </span>
                            {trade.strategy && (
                              <span className="truncate text-2xs text-ink-ghost">
                                {trade.strategy}
                              </span>
                            )}
                          </div>
                          <span className="display-num mt-1 block text-2xs text-ink-ghost">
                            {trade.date} · in {formatCurrency(trade.entry)} · stop{' '}
                            {formatCurrency(trade.stopLoss)} · risked{' '}
                            {formatCurrency(trade.riskAmount)}
                          </span>
                        </div>

                        <div className="shrink-0 text-right">
                          <span
                            className={`display-num block text-sm ${
                              result === 'win'
                                ? 'text-reward-soft'
                                : result === 'loss'
                                  ? 'text-risk-soft'
                                  : 'text-ink-muted'
                            }`}
                          >
                            {trade.pnl === null
                              ? PLACEHOLDER
                              : `${trade.pnl > 0 ? '+' : ''}${formatCurrency(trade.pnl)}`}
                          </span>
                          <span className="display-num mt-0.5 block text-2xs text-ink-ghost">
                            {r !== null ? `${formatNumber(r, 2)}R` : 'open'}
                          </span>
                        </div>

                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => openForm(trade)}
                            aria-label={`Edit ${trade.symbol} trade`}
                            className="rounded-lg p-2 text-ink-ghost transition-colors hover:bg-white/[0.04] hover:text-ink-muted"
                          >
                            <Pencil size={13} aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(trade.id)}
                            aria-label={`Delete ${trade.symbol} trade`}
                            className="rounded-lg p-2 text-ink-ghost transition-colors hover:bg-risk-wash hover:text-risk-soft"
                          >
                            <Trash2 size={13} aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}
