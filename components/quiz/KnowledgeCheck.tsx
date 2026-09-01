'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import { QUIZ } from '@/data/quiz';
import { useSessionState } from '@/lib/hooks';

type Answers = Record<string, number>;

/**
 * A short knowledge check. Deliberately light: no streaks, no timers, no
 * points. The value is the explanation attached to every option, which is
 * shown whether the answer was right or wrong.
 */
export function KnowledgeCheck() {
  const [answers, setAnswers] = useSessionState<Answers>('riskline:quiz', {});
  const [index, setIndex] = useState(0);

  const question = QUIZ[index];
  const chosen = answers[question.id];
  const answered = chosen !== undefined;
  const correctIndex = question.options.findIndex((option) => option.correct);

  const score = useMemo(
    () =>
      QUIZ.reduce((total, item) => {
        const answer = answers[item.id];
        if (answer === undefined) return total;
        return item.options[answer]?.correct ? total + 1 : total;
      }, 0),
    [answers],
  );

  const answeredCount = QUIZ.filter((item) => answers[item.id] !== undefined).length;
  const complete = answeredCount === QUIZ.length;

  const choose = (optionIndex: number) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const reset = () => {
    setAnswers({});
    setIndex(0);
  };

  return (
    <div className="panel overflow-hidden">
      {/* ------------------------------------------------------------ progress */}
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="label">
            Question {index + 1} of {QUIZ.length}
          </span>
          <span className="display-num text-xs text-ink-muted">
            {score} / {answeredCount || 0} correct
          </span>
        </div>

        <div className="mt-3 flex gap-1" role="presentation">
          {QUIZ.map((item, i) => {
            const answer = answers[item.id];
            const state =
              answer === undefined
                ? 'pending'
                : item.options[answer]?.correct
                  ? 'correct'
                  : 'wrong';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to question ${i + 1}`}
                aria-current={i === index || undefined}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  state === 'correct'
                    ? 'bg-reward/70'
                    : state === 'wrong'
                      ? 'bg-risk/70'
                      : i === index
                        ? 'bg-accent'
                        : 'bg-line-strong hover:bg-ink-ghost'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------ question */}
      <div className="p-5 sm:p-6">
        <h2 className="text-pretty text-lg font-medium leading-snug text-ink">
          {question.question}
        </h2>

        <ul className="mt-5 space-y-2">
          {question.options.map((option, optionIndex) => {
            const isChosen = chosen === optionIndex;
            const isCorrect = Boolean(option.correct);
            const reveal = answered;

            return (
              <li key={option.label}>
                <button
                  type="button"
                  onClick={() => choose(optionIndex)}
                  disabled={answered}
                  aria-pressed={isChosen}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                    !reveal
                      ? 'border-line bg-base-sunken/40 hover:border-accent/30 hover:bg-accent-wash'
                      : isCorrect
                        ? 'border-reward/40 bg-reward-wash'
                        : isChosen
                          ? 'border-risk/40 bg-risk-wash'
                          : 'border-line bg-base-sunken/20 opacity-60'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      !reveal
                        ? 'border-line-strong'
                        : isCorrect
                          ? 'border-reward bg-reward text-[#06080c]'
                          : isChosen
                            ? 'border-risk bg-risk text-[#06080c]'
                            : 'border-line'
                    }`}
                  >
                    {reveal && isCorrect && <Check size={10} strokeWidth={3} />}
                    {reveal && isChosen && !isCorrect && <X size={10} strokeWidth={3} />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-ink">{option.label}</span>
                    {reveal && (
                      <span className="mt-1.5 block animate-fade-in text-xs leading-relaxed text-ink-faint">
                        {option.why}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {answered && (
          <div className="mt-5 animate-fade-up border-t border-line pt-5">
            <p className="text-sm text-ink">
              {question.options[chosen]?.correct ? (
                <span className="text-reward-soft">Correct.</span>
              ) : (
                <span className="text-risk-soft">
                  Not quite — the answer is “{question.options[correctIndex]?.label}”.
                </span>
              )}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`/trading-dictionary/${question.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
              >
                Read more: {question.termLabel}
                <ArrowRight
                  size={13}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              {index < QUIZ.length - 1 && (
                <button
                  type="button"
                  onClick={() => setIndex(index + 1)}
                  className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-xl bg-accent px-4 text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
                >
                  Next question
                  <ArrowRight size={13} aria-hidden />
                </button>
              )}
            </div>
          </div>
        )}

        {complete && index === QUIZ.length - 1 && (
          <div className="mt-5 animate-fade-up rounded-xl border border-accent/25 bg-accent-wash p-5">
            <p className="text-sm font-medium text-ink">
              You scored {score} out of {QUIZ.length}.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              {score === QUIZ.length
                ? 'Every one. The relationships between stop distance, position size and risk are the part most people never internalize — you have.'
                : score >= QUIZ.length * 0.7
                  ? 'Solid. The ones you missed are worth reading properly — each links to the concept that explains it.'
                  : 'Worth a second pass. These relationships are the difference between a plan that survives a losing streak and one that does not.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line-strong px-4 text-xs font-medium text-ink transition-colors hover:border-accent/40"
              >
                <RotateCcw size={12} aria-hidden />
                Start over
              </button>
              <Link
                href="/calculator"
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-accent px-4 text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
              >
                Put it into practice
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------- navigation */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
        <button
          type="button"
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="text-xs text-ink-faint transition-colors hover:text-ink disabled:opacity-30 disabled:hover:text-ink-faint"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setIndex(Math.min(QUIZ.length - 1, index + 1))}
          disabled={index === QUIZ.length - 1}
          className="text-xs text-ink-faint transition-colors hover:text-ink disabled:opacity-30 disabled:hover:text-ink-faint"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
