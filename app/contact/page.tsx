import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${SITE.name} team — corrections, questions, or feedback on the calculator or the dictionary.`,
  alternates: { canonical: '/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <article className="max-w-[60ch]">
        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Contact
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          Found an error in a calculation or a definition? Have a term you think is missing? Want to
          report a bug? All of it is useful — send it over.
        </p>

        <a
          href={`mailto:${SITE.contactEmail}`}
          className="mt-7 inline-flex items-center gap-2.5 rounded-xl border border-line-strong bg-base-raised/50 px-5 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent-soft"
        >
          <Mail size={16} aria-hidden />
          {SITE.contactEmail}
        </a>

        <div className="prose-riskline mt-10 space-y-6">
          <section>
            <h2 className="text-sm font-medium text-ink">What to include</h2>
            <p className="mt-2">
              For a correction, the page URL and what specifically looks wrong. For a bug, what you
              were doing when it happened and, if possible, a screenshot.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Response time</h2>
            <p className="mt-2">
              {SITE.name} is a small, independently run project. Most messages get a reply within a
              few days, though it can take longer.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
