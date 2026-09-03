# StopSize

**Know the trade. Know the risk.**

A trading risk-management platform, organised into four sections so a
first-time visitor never has to choose between a dozen links:

| Section | What lives there |
| --- | --- |
| **Calculate** | Risk calculator (stocks, forex, futures, crypto) and two focused tools |
| **Markets** | Live crypto prices and official ECB forex rates, each one click from being sized |
| **Journal** | Trade log and performance dashboard — no account, stored on the device |
| **Learn** | 135-term dictionary, six guides, 24 market events, FAQ and a knowledge check |

The principle behind the interface is **simple on the surface, powerful
underneath**. The calculator opens with four inputs and one answer; markets,
contract multipliers, targets and the other fourteen metrics are one
disclosure away rather than on screen by default.

The loop the product is built around: **learn → understand → calculate →
journal.**

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (prerenders 187 routes) |
| `npm start` | Serve the production build |
| `npm test` | Run the test suite (720 tests) |
| `npm run typecheck` | Type-check without emitting |

Set `NEXT_PUBLIC_SITE_URL` at deploy time so canonical URLs, Open Graph tags
and the sitemap point at the real domain. It defaults to `https://stopsize.com`.

## Routes

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static | Hero with a live trade builder, the learning loop, tool and dictionary entry points |
| `/calculator` | Dynamic | Full risk calculator with Stocks/Forex/Futures/Crypto modes; accepts prefill query params |
| `/markets` | ISR (60s) | Live crypto + ECB forex rates, searchable, each row links into the calculator |
| `/journal` | Static shell | Trade log, filters and performance dashboard; data lives in the browser |
| `/tools` | Static | Tool discovery |
| `/tools/position-size` | Static | Focused position size calculator + how-to content |
| `/tools/risk-reward` | Static | Risk/reward ratio, break-even win rate, win-rate explorer |
| `/trading-dictionary` | Dynamic | Search, category filters, A–Z, recently viewed |
| `/trading-dictionary/[slug]` | SSG × 135 | One indexable page per term |
| `/guides` | Static | Index of long-form guides |
| `/guides/[slug]` | SSG × 6 | A full concept worked through with tables, diagrams and a live calculator |
| `/market-history` | Static | 24 landmark market events, 1987–2025, chronological |
| `/market-history/[slug]` | SSG × 24 | What happened, key facts, a real related photo, and the risk lesson — closed history, not news |
| `/faq` | Static | 15 questions across 4 groups, with `FAQPage` structured data |
| `/learn` | Static | 12-question knowledge check |
| `/about` | Static | What the product is and why it exists |
| `/disclaimer` | Static | Educational-use disclaimer |
| `/privacy` | Static | Privacy policy — required by AdSense |
| `/contact` | Static | Contact email |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from the term and guide data |

`/calculator` accepts `?account=&risk=&direction=&entry=&stop=&tp=&market=` so
the homepage hero, dictionary pages and the markets table can hand a trade
straight into the tool. Arriving with a price but no stop seeds a visible
2%-away placeholder rather than opening on a validation error.

## Market data

Two sources, both keyless and publicly redistributable, so the project needs no
API keys or accounts:

| Asset class | Source | Freshness |
| --- | --- | --- |
| Crypto | CoinGecko public API | Revalidated once a minute |
| Forex | Frankfurter, serving ECB reference rates | One publication per business day |

Real-time **equity** prices are deliberately absent. Redistributing them on a
public, ad-supported page requires an exchange display licence that no free
tier grants, so the page shows nothing rather than something mislabelled, and
says so. Every quote carries its own source and freshness label.

Next's fetch cache means one upstream request serves every visitor for the
revalidation window, so traffic does not scale API usage.

## The journal has no backend

Trades are stored in the browser's own `localStorage`. That is a deliberate
architectural choice, not a shortcut: it means the journal works on the first
visit with no sign-up, no database and no personal data leaving the device.
Accounts, when they arrive, become a **sync** feature layered on top rather
than a gate in front.

Storage is treated as untrusted input — `parseTrades` drops anything that does
not look like a trade instead of letting it poison the statistics — and CSV
export exists so the data is never hostage to one browser profile.

## Architecture

```
app/                     Routes, metadata, structured data
components/
  calculator/            TradeLadder, RiskCalculator, tools, MathBreakdown
  markets/               Searchable quote table
  journal/               Trade form, list, performance dashboard
  dictionary/            Explorer, search dialog, embedded mini-tools
  diagrams/              Hand-tuned SVG explainers
  quiz/                  Knowledge check
  layout/                Header, footer, ad slots, consent banner
  ui/                    NumberField, Stat, Segmented, AnimatedNumber, …
data/
  terms/                 135 terms, one file per category
  guides/                6 long-form guides, one file each
  history/               24 market events, grouped into 5 files by era
  categories.ts          Category definitions
  tools.ts               Tool registry
  quiz.ts                Quiz questions
  faq.ts                 FAQ questions, grouped
lib/
  trade-math.ts          All calculation logic — pure, no UI
  format.ts              Currency, price, percent, ratio formatting
  dictionary.ts          Lookup, relations, navigation
  guides.ts              Same pattern as dictionary.ts, for guides
  history.ts             Same pattern again, for market history
  markets.ts             Quote fetching, plus pure pair/change/sort logic
  journal.ts             Trade statistics, grouping, filtering, CSV export
  search.ts              Ranked search over a lightweight index
  palette.ts             Color source of truth (Tailwind reads this)
  seo.ts                 Title and description builders
  consent.ts             Cookie-consent storage
  hooks.ts               Animation, session state, reduced motion
types/                   Shared type definitions
```

### Calculation logic is separate from UI

Every number the product shows comes from `lib/trade-math.ts`. It is pure and
synchronous, so it runs on every keystroke, and it is the only place the math
lives — the homepage hero, the full calculator, the focused tools and the
dictionary mini-tools all call the same functions.

Two rules hold throughout:

- **Every division goes through `safeDivide`**, which returns `null` rather than
  `NaN` or `Infinity`. The UI renders `—` for `null`, so a broken input can
  never display a broken number.
- **Validation is separate from calculation.** `validateTrade` returns errors
  (which block results and are shown inline on the offending field) and warnings
  (advisory — aggressive risk, exposure above 100%, sub-unit position sizes),
  which appear alongside valid results.

The full calculator (`/calculator`) also switches between Stocks, Forex,
Futures and Crypto. For everything except futures this is a relabeling — the
position-size math is identical because one unit of price movement equals one
unit of account currency. Futures genuinely differ: a contract's P&L per point
is fixed by the exchange (an ES point is worth $50, not $1), so
`calculateTrade` takes an optional `contractMultiplier` that scales
`riskPerUnit` into a real dollar figure before position size is derived from
it — the risk/reward ratio stays untouched since the multiplier cancels out on
both sides of that division.

The trade ladder is drawn from `ladderGeometry`, the same function family that
produces the numbers, so the picture cannot disagree with the results.

### Search

`lib/search.ts` operates on a compact record — slug, name, definition, aliases —
rather than full `Term` objects. The header dialog and the dictionary explorer
receive that index from a server component, which keeps every explanation
paragraph out of the JavaScript bundle. Ranking is exact match → name prefix →
alias → substring → definition, with popular terms nudged up on ties.

## Testing

720 tests across nine suites, run with `npm test`:

- **`trade-math.test.ts`** — the worked example, long/short symmetry, invalid
  input (zero, negative, `NaN`, `Infinity`, inverted stops and targets), extreme
  values (sub-penny prices, six-figure instruments), whole-unit rounding, the
  futures contract multiplier (scales dollar risk without touching the
  risk/reward ratio), and an assertion that no code path returns a
  non-finite number.
- **`dictionary.test.ts`** — every term is complete, slugs are unique and
  URL-safe, every `related` slug resolves, every tool link points at a real
  route, no term is orphaned, and search returns the documented suggestions.
- **`guides.test.ts`** — every guide has real depth (minimum section, paragraph
  and takeaway counts), every table row matches its header count, every related
  term and tool link resolves, and the prev/next chain is continuous.
- **`faq.test.ts`** — every question is substantial and unique, and every link
  resolves to a real term, guide, or static route.
- **`history.test.ts`** — exactly 24 events, sorted chronologically, spanning a
  real range of years and categories, every fact/body/lesson paragraph meets a
  minimum depth, every related term resolves, no lesson is worded as a
  guarantee of future results, and every event has a real photo with
  descriptive alt text unique to that event.
- **`markets.test.ts`** — forex pairs derived correctly from USD-based ECB
  rates (including inverted and cross rates), missing or zero rates returning
  `null` rather than a wrong price, percent change never producing `Infinity`,
  and the screener's sorting and filtering.
- **`journal.test.ts`** — R multiples, equity curves that ignore open trades,
  peak-to-trough drawdown, and the cases where a `0` would lie: no closed
  trades yields `null` rather than a 0% win rate, and profit factor is
  undefined rather than infinite when there are no losses. Also covers corrupt
  storage being dropped and CSV escaping.
- **`seo.test.ts`** — every generated title and meta description fits inside
  search-result truncation limits.
- **`palette.test.ts`** — every text color clears WCAG AA (4.5:1) against every
  background surface.

## Accessibility

- Semantic landmarks, a skip link, and a heading order that never skips levels.
- All interactive elements are reachable and operable by keyboard. The search
  dialog supports `⌘/Ctrl+K`, arrow keys, `Enter` and `Escape`; number fields
  support arrow-key stepping.
- Visible focus rings on a dedicated offset ring, never removed.
- The direction control is a real radio group; number fields use real labels and
  `aria-describedby` for hints and errors, with errors announced via `role="alert"`.
- Charts and diagrams expose a text description; decorative icons are hidden.
- `prefers-reduced-motion` shortens transitions rather than removing state
  changes, so nothing becomes ambiguous — and `useAnimatedNumber` returns values
  immediately instead of easing.

## Monetization

`components/layout/AdSlot.tsx` reserves height-stable placements between
educational sections, inside dictionary pages and below tool results. Nothing
renders unless `NEXT_PUBLIC_ADS_ENABLED=true`, so the layout is identical with
ads on or off and adding a network later causes no layout shift. The calculator
input and results area has no slot.

`components/layout/ConsentBanner.tsx` records an accept/decline choice in
`localStorage` (`lib/consent.ts`) before any non-essential cookie is expected
to be set — required for EEA/UK traffic under Google's ad policies. It is a
functional baseline; once AdSense is approved, either wire the real
`adsbygoogle` script to gate on this stored choice (`AdSlot.tsx` documents the
exact steps), or switch on AdSense's own "Privacy & messaging" (Funding
Choices) in the dashboard, which is Google's native, pre-certified path and
needs no extra code here.

Applying for AdSense also requires `/privacy`, `/about` and `/contact` to
exist and be reachable — they're built and linked from the footer. The one
piece that cannot be prepared in advance is `public/ads.txt`, which needs the
real publisher ID AdSense assigns on approval.

## Content

All content is original and written in American English. Each term includes a
one-sentence definition, a plain-language explanation, a formula where one
applies, why it matters, common mistakes, related terms, and — for 14 of them —
a working calculator.

The six guides (`data/guides/`) go longer: each one works a full idea through
with real numbers, at least four sections, a worked table, and usually a
diagram or an embedded calculator, ending in a tested cross-link to the
dictionary terms and tools it draws on. The FAQ (`data/faq.ts`) answers 15
concrete questions across four groups — the calculator, the dictionary, data
and privacy, and the concepts themselves — with `FAQPage` structured data.

Market History (`data/history/`) is 24 landmark events from 1987 to 2025 —
Black Monday through the 2025 tariff shock — each with key facts, a real
related photo (licensed for commercial use, stored under `public/images/history/`),
what happened, and a risk-management lesson. Deliberately chosen over a news
section: these are closed, verifiable events rather than content that goes
stale and needs maintaining, which fits a site not being actively updated
going forward.

Nothing here is financial advice. See `/disclaimer`.
