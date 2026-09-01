'use client';

import { useAnimatedNumber, useChangePulse } from '@/lib/hooks';

interface AnimatedNumberProps {
  value: number | null;
  /** Formatter applied to the interpolated value on every frame. */
  format: (value: number | null) => string;
  className?: string;
  /** Adds a brief accent flash when the value changes. */
  pulse?: boolean;
  duration?: number;
}

/**
 * Displays a number that eases to its new value instead of snapping.
 * Null renders the formatter's placeholder and skips animation entirely, so a
 * result that becomes unavailable never animates toward zero.
 */
export function AnimatedNumber({
  value,
  format,
  className = '',
  pulse = false,
  duration,
}: AnimatedNumberProps) {
  const target = value ?? 0;
  const animated = useAnimatedNumber(target, duration);
  const pulsing = useChangePulse(value, 460);

  const display = value === null ? format(null) : format(animated);

  return (
    <span
      className={`tabular-nums transition-colors duration-300 ${
        pulse && pulsing ? 'text-accent-soft' : ''
      } ${className}`}
    >
      {display}
    </span>
  );
}
