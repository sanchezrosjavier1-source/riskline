import type { Metadata } from 'next';
import { PAGE_SEO } from '@/data/page-seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AdSlot } from '@/components/layout/AdSlot';
import { FAQ_GROUPS } from '@/data/faq';
import { SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: PAGE_SEO.faq.title,
  description: PAGE_SEO.faq.description,
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `Frequently Asked Questions — ${SITE.name}`,
    description: 'Answers about the calculator, the dictionary, your data, and how the site works.',
    url: absoluteUrl('/faq'),
  },
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.entries.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: { '@type': 'Answer', text: entry.answer },
      })),
    ),
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]} />

      <header className="max-w-[60ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          Everything here is a genuine question people ask about the calculator, the dictionary,
          how their data is handled, and a few of the concepts themselves.
        </p>
      </header>

      <div className="mt-9 max-w-[68ch] space-y-10">
        {FAQ_GROUPS.map((group) => (
          <section key={group.title} aria-labelledby={group.title}>
            <h2 id={group.title} className="text-lg font-semibold tracking-tight text-ink">
              {group.title}
            </h2>
            <div className="mt-4 space-y-2.5">
              {group.entries.map((entry) => (
                <details
                  key={entry.question}
                  className="group rounded-xl border border-line bg-base-raised/30 open:bg-base-raised/50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-ink marker:content-none">
                    {entry.question}
                    <span
                      aria-hidden
                      className="shrink-0 text-ink-ghost transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm leading-relaxed text-ink-muted">{entry.answer}</p>
                    {entry.href && (
                      <Link
                        href={entry.href}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
                      >
                        {entry.hrefLabel ?? 'Learn more'}
                        <ArrowRight size={12} aria-hidden />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AdSlot id="faq-below" className="mt-10" />

      <div className="mt-10 max-w-[68ch] rounded-xl border border-line bg-base-sunken/50 p-5">
        <p className="text-sm text-ink-muted">
          Question not answered here?{' '}
          <Link href="/contact" className="link-underline">
            Get in touch
          </Link>
          .
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
