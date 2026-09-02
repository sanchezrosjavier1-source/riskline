import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  Gauge,
  Layers,
  Percent,
  Scale,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AdSlot } from '@/components/layout/AdSlot';
import { EMBEDDED_TOOLS, TOOLS, type ToolEntry } from '@/data/tools';
import { getTerm } from '@/lib/dictionary';
import { SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Trading Calculators — Position Size, Risk & Reward',
  description:
    'Free trading calculators for position sizing, risk management and risk/reward. Every result is explained and links to the concept behind it.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: `Trading Calculators — ${SITE.name}`,
    description: 'Free calculators for position sizing, risk and reward — with the math explained.',
    url: absoluteUrl('/tools'),
  },
};

const ICONS = {
  gauge: Gauge,
  calculator: Calculator,
  scale: Scale,
  'trending-down': TrendingDown,
  percent: Percent,
  layers: Layers,
} as const;

export default function ToolsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'StopSize Trading Calculators',
    itemListElement: [...TOOLS, ...EMBEDDED_TOOLS].map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(tool.href),
    })),
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
        ]}
      />

      <header className="max-w-[58ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Trading Calculators
        </h1>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-muted">
          Learn it. Calculate it. Understand it.
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-faint">
          Every tool here runs the same calculation engine, shows its working, and links back to the
          concepts behind the result. Nothing to install, no account needed.
        </p>
      </header>

      <section aria-labelledby="main-tools" className="mt-10">
        <h2 id="main-tools" className="text-sm font-medium text-ink">
          Full calculators
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} featured />
          ))}
        </div>
      </section>

      <AdSlot id="tools-mid" className="mt-8" />

      <section aria-labelledby="embedded-tools" className="mt-12">
        <div className="max-w-[58ch]">
          <h2 id="embedded-tools" className="text-sm font-medium text-ink">
            Calculators built into the lesson
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-ink-faint">
            These are fully working tools that live inside the dictionary page that explains them,
            because the concept and the calculation are the same lesson. Change the numbers and read
            what happens.
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EMBEDDED_TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

function ToolCard({ tool, featured = false }: { tool: ToolEntry; featured?: boolean }) {
  const Icon = ICONS[tool.icon];
  const concepts = tool.concepts
    .map((slug) => getTerm(slug))
    .filter((term): term is NonNullable<typeof term> => Boolean(term))
    .slice(0, 3);

  return (
    <div
      className={`group flex flex-col rounded-2xl border border-line bg-base-raised/40 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-base-raised/70 ${
        featured ? '' : 'sm:p-4'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-accent-wash text-accent transition-colors duration-300 group-hover:border-accent/40">
          <Icon size={16} aria-hidden />
        </div>
        {tool.embedded && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-[0.5625rem] uppercase tracking-label text-ink-ghost">
            <Sparkles size={9} aria-hidden />
            In the lesson
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[0.9375rem] font-medium text-ink">{tool.name}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-faint">{tool.blurb}</p>

      <div className="mt-4 rounded-lg border border-line bg-base-sunken/60 p-3">
        <p className="label mb-1.5">Example</p>
        <p className="display-num text-2xs leading-relaxed text-ink-ghost">{tool.example}</p>
        <p className="display-num mt-1.5 text-xs leading-relaxed text-ink">{tool.result}</p>
      </div>

      {concepts.length > 0 && (
        <div className="mt-4">
          <p className="label mb-2">Teaches</p>
          <div className="flex flex-wrap gap-1.5">
            {concepts.map((term) => (
              <Link
                key={term.slug}
                href={`/trading-dictionary/${term.slug}`}
                className="rounded-md border border-line px-2 py-1 text-2xs text-ink-faint transition-colors hover:border-accent/30 hover:text-accent-soft"
              >
                {term.term}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link
        href={tool.href}
        className="mt-5 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line-strong text-xs font-medium text-ink transition-all duration-200 hover:border-accent/40 hover:bg-accent-wash hover:text-accent-soft"
      >
        Open Tool
        <ArrowRight
          size={13}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
