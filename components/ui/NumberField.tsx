'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, Minus, Plus } from 'lucide-react';
import { parseNumericInput } from '@/lib/format';

interface NumberFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  hint?: string;
  /** Inline validation message. Presence switches the field to its error state. */
  error?: string;
  optional?: boolean;
  /** Rendered above the input, e.g. a quick-pick row. */
  adornment?: React.ReactNode;
  size?: 'sm' | 'md';
}

/**
 * A numeric input that keeps its own text buffer so partial entries like
 * "1." or "" stay editable, while reporting a clean number (or null) upward.
 */
export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min,
  max,
  placeholder,
  hint,
  error,
  optional = false,
  adornment,
  size = 'md',
}: NumberFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const [text, setText] = useState(() => (value === null ? '' : String(value)));
  const focused = useRef(false);

  // Re-sync from outside (presets, reset, linked fields) but never fight the
  // user while they are mid-keystroke.
  useEffect(() => {
    if (focused.current) return;
    const parsed = parseNumericInput(text);
    if (parsed !== value) setText(value === null ? '' : String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const commit = (next: string) => {
    setText(next);
    onChange(parseNumericInput(next));
  };

  const nudge = (direction: 1 | -1) => {
    const current = parseNumericInput(text) ?? 0;
    let next = current + direction * step;
    if (typeof min === 'number') next = Math.max(min, next);
    if (typeof max === 'number') next = Math.min(max, next);
    // Kill float drift from repeated fractional steps (0.1 + 0.2 style).
    const decimals = (String(step).split('.')[1] ?? '').length;
    next = Number(next.toFixed(decimals));
    setText(String(next));
    onChange(next);
  };

  const invalid = Boolean(error);
  const tall = size === 'md';

  return (
    <div className="group/field">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="label">
          {label}
        </label>
        {optional && <span className="text-2xs text-ink-ghost">Optional</span>}
        {adornment}
      </div>

      <div
        className={`relative flex items-center rounded-xl border bg-base-sunken/60 transition-all duration-200 ${
          invalid
            ? 'border-risk/50 bg-risk-wash'
            : 'border-line hover:border-line-strong focus-within:border-accent/60 focus-within:bg-base-sunken'
        }`}
      >
        {prefix && (
          <span
            aria-hidden
            className={`pl-3.5 pr-1 font-mono text-sm ${invalid ? 'text-risk-soft' : 'text-ink-faint'}`}
          >
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={text}
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={error || hint ? hintId : undefined}
          onFocus={(event) => {
            focused.current = true;
            event.currentTarget.select();
          }}
          onBlur={() => {
            focused.current = false;
            // Normalize the buffer on exit: "05." becomes "5".
            const parsed = parseNumericInput(text);
            setText(parsed === null ? '' : String(parsed));
          }}
          onChange={(event) => commit(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              nudge(1);
            } else if (event.key === 'ArrowDown') {
              event.preventDefault();
              nudge(-1);
            }
          }}
          className={`w-full min-w-0 bg-transparent font-mono tabular-nums text-ink placeholder:text-ink-ghost focus:outline-none ${
            tall ? 'py-3 text-lg' : 'py-2.5 text-base'
          } ${prefix ? 'pl-0' : 'pl-3.5'} ${suffix ? 'pr-1' : 'pr-2'}`}
        />

        {suffix && (
          <span
            aria-hidden
            className={`pr-1 font-mono text-sm ${invalid ? 'text-risk-soft' : 'text-ink-faint'}`}
          >
            {suffix}
          </span>
        )}

        <div className="flex shrink-0 flex-col border-l border-line">
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Increase ${label}`}
            onClick={() => nudge(1)}
            className="flex h-[22px] w-8 items-center justify-center text-ink-ghost transition-colors hover:bg-white/[0.04] hover:text-ink active:bg-white/[0.07]"
          >
            <Plus size={11} strokeWidth={2.5} aria-hidden />
          </button>
          <div className="h-px w-full bg-line" />
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Decrease ${label}`}
            onClick={() => nudge(-1)}
            className="flex h-[22px] w-8 items-center justify-center text-ink-ghost transition-colors hover:bg-white/[0.04] hover:text-ink active:bg-white/[0.07]"
          >
            <Minus size={11} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </div>

      {(error || hint) && (
        <p
          id={hintId}
          role={error ? 'alert' : undefined}
          className={`mt-2 flex items-start gap-1.5 text-xs leading-snug ${
            error ? 'text-risk-soft' : 'text-ink-faint'
          }`}
        >
          {error && <AlertCircle size={13} className="mt-px shrink-0" aria-hidden />}
          <span>{error || hint}</span>
        </p>
      )}
    </div>
  );
}
