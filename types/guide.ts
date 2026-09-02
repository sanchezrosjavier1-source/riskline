import type { DiagramKind, WidgetKind } from './dictionary';

export type GuideTopic =
  | 'Risk Management'
  | 'Position Sizing'
  | 'Trade Planning'
  | 'Leverage & Margin';

export interface GuideSection {
  heading: string;
  body: string[];
  /** Renders the shared Diagram component right after this section's text. */
  diagram?: DiagramKind;
  /** Renders a live TermWidget mini-calculator right after this section's text. */
  widget?: WidgetKind;
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

export interface Guide {
  slug: string;
  title: string;
  /**
   * A shorter version of the title for the <title> tag, used only when the
   * full title would push the browser-tab title past search-result
   * truncation. Falls back to `title` when omitted. The H1 always shows the
   * full title regardless.
   */
  shortTitle?: string;
  /** One or two sentences shown on the index card and as the page dek. */
  dek: string;
  topic: GuideTopic;
  /** Short bullets shown at the top as a preview of the whole piece. */
  keyTakeaways: string[];
  intro: string[];
  sections: GuideSection[];
  /** Closing summary paragraphs, before the related-content rail. */
  conclusion: string[];
  /** Dictionary slugs this guide draws on. Validated at build time. */
  relatedTerms: string[];
  tools?: Array<{ label: string; href: string }>;
}
