import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How StopSize handles data: what is stored locally in your browser, what analytics and advertising partners may collect, and how to control it.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'September 2026';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', href: '/privacy' },
        ]}
      />

      <article className="max-w-[68ch]">
        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-ink-ghost">Last updated: {LAST_UPDATED}</p>

        <div className="prose-riskline mt-8 space-y-8">
          <section>
            <h2 className="text-sm font-medium text-ink">Overview</h2>
            <p className="mt-2">
              {SITE.name} ({SITE.url}) is built so its core product — the risk calculator and the
              trading dictionary — works without an account, without a signup form, and without
              collecting personal information to function. This page explains exactly what data
              exists, where it lives, and who else might have access to it.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Data stored in your browser</h2>
            <p className="mt-2">
              Saved calculator scenarios, recently viewed dictionary terms, and your answers on the
              knowledge check are stored using your browser&apos;s <code>sessionStorage</code>.
              This data:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>Never leaves your device — it is not sent to our servers.</li>
              <li>Is cleared automatically when you close the browser tab.</li>
              <li>Can be cleared manually at any time from within the site (a &ldquo;Clear all&rdquo; control sits next to each saved list) or by clearing your browser&apos;s site data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Server logs</h2>
            <p className="mt-2">
              Like virtually every website, our hosting provider automatically logs standard
              technical information for every request — IP address, browser type, the page
              requested, and the time of the request. This is used only for security, diagnosing
              outages, and understanding aggregate traffic. We do not use it to identify individual
              visitors.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Analytics</h2>
            <p className="mt-2">
              We may use a privacy-respecting analytics tool to understand aggregate traffic — which
              pages are visited, roughly how many people, and from what regions. If enabled, this is
              disclosed here with the specific provider and what it collects. As of the last update
              above, no analytics service is active on {SITE.name}.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Advertising</h2>
            <p className="mt-2">
              {SITE.name} may display advertisements served by Google AdSense. If and when ads are
              active on this site:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>
                Google, as a third-party vendor, uses cookies to serve ads based on your prior
                visits to this and other websites.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads
                based on your visit to this site and/or other sites on the Internet.
              </li>
              <li>
                You can opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="link-underline"
                >
                  Google Ads Settings
                </a>
                . You can also opt out of a third-party vendor&apos;s use of cookies for
                personalized advertising by visiting{' '}
                <a
                  href="https://optout.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="link-underline"
                >
                  aboutads.info
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              Google&apos;s own privacy practices are described in the{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="link-underline"
              >
                Google Privacy &amp; Terms
              </a>{' '}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Cookies</h2>
            <p className="mt-2">
              We do not set our own tracking or advertising cookies. Any cookies present on this
              site come from third-party services described above (advertising, and analytics if
              enabled), each of which sets its own cookies subject to its own policy. Where required
              by law, you will be asked for consent before any non-essential cookie is set.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Children&apos;s privacy</h2>
            <p className="mt-2">
              {SITE.name} is not directed at children under 13, and we do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Your rights</h2>
            <p className="mt-2">
              Because we do not operate accounts or a database of personal information, there is
              generally nothing to request, export, or delete on our end beyond what is described
              above. If you are in the EEA, UK, or another jurisdiction with statutory data rights
              and have a question about a specific request, contact us using the details on the{' '}
              <Link href="/contact" className="link-underline">
                Contact
              </Link>{' '}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Changes to this policy</h2>
            <p className="mt-2">
              If this policy changes, the date at the top of this page will be updated. Material
              changes will be reflected here before they take effect.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent through the{' '}
              <Link href="/contact" className="link-underline">
                Contact
              </Link>{' '}
              page.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
