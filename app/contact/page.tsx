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
            <h2 className="text-sm font-medium text-ink">Corrections come first</h2>
            <p className="mt-2">
              A wrong tick value or a mistyped formula is worse than no tool at all, because it is
              wrong in a way that looks right. Corrections are handled before anything else on the
              list, and the page is updated as soon as the error is confirmed.
            </p>
            <p>
              Include the page URL and what specifically looks wrong — ideally the numbers you put
              in and the number you expected back. That is usually enough to reproduce it in a
              minute rather than an afternoon.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Bugs</h2>
            <p className="mt-2">
              Say what you were doing when it happened, which browser you were in, and whether it
              happens every time or once. A screenshot helps more than a description.
            </p>
            <p>
              One thing worth knowing before you write: the journal stores your trades in your own
              browser, so clearing site data, switching browsers or opening the site in a private
              window will show an empty journal. That is the design, not a bug — but if entries
              vanish without any of those happening, please do report it.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Missing terms and requests</h2>
            <p className="mt-2">
              If you looked something up and the dictionary did not have it, that is genuinely
              useful to hear — a gap you hit is worth more than a term chosen from a list. The same
              goes for a futures contract whose specification is not in the calculator yet.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">What cannot be answered</h2>
            <p className="mt-2">
              Questions about specific trades, positions or markets will not get a reply. Not out
              of rudeness: {SITE.name} is educational, is not authorised to give financial advice,
              and an answer to &ldquo;should I take this trade&rdquo; would be exactly that.
              Questions about how a calculation works are always welcome.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Response time</h2>
            <p className="mt-2">
              {SITE.name} is run by one person alongside other work. Most messages get a reply
              within a few days, and corrections are usually fixed faster than they are answered.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
