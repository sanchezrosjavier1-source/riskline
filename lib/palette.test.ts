import { describe, expect, it } from 'vitest';
import {
  ACCENT,
  BACKGROUND,
  ON_ACCENT,
  REWARD,
  RISK,
  TEXT,
  WARN,
  contrastRatio,
} from './palette';

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

describe('contrastRatio', () => {
  it('reports the maximum ratio for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('reports 1 for identical colors', () => {
    expect(contrastRatio('#7f8dff', '#7f8dff')).toBeCloseTo(1, 5);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#e9edf3', '#07090c')).toBeCloseTo(
      contrastRatio('#07090c', '#e9edf3'),
      10,
    );
  });
});

describe('text colors meet WCAG AA on every surface', () => {
  const surfaces = Object.entries(BACKGROUND);
  const textColors = Object.entries(TEXT);

  for (const [surfaceName, surface] of surfaces) {
    for (const [textName, color] of textColors) {
      it(`ink.${textName} on base.${surfaceName}`, () => {
        const ratio = contrastRatio(color, surface);
        expect(ratio, `${color} on ${surface} is ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
          AA_NORMAL,
        );
      });
    }
  }
});

describe('accent colors are readable as text', () => {
  const accents = {
    accent: ACCENT.DEFAULT,
    'accent.soft': ACCENT.soft,
    reward: REWARD.DEFAULT,
    'reward.soft': REWARD.soft,
    risk: RISK.DEFAULT,
    'risk.soft': RISK.soft,
    warn: WARN.DEFAULT,
  };

  for (const [name, color] of Object.entries(accents)) {
    it(`${name} on the page background`, () => {
      expect(contrastRatio(color, BACKGROUND.DEFAULT)).toBeGreaterThanOrEqual(AA_NORMAL);
    });
  }

  it('accent.deep is only used for large or non-text elements', () => {
    // Used as a pressed-button fill, never as body text.
    expect(contrastRatio(ON_ACCENT, ACCENT.deep)).toBeGreaterThanOrEqual(AA_LARGE);
  });
});

describe('filled surfaces', () => {
  it('primary button text is readable on the accent fill', () => {
    expect(contrastRatio(ON_ACCENT, ACCENT.DEFAULT)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it('primary button stays readable on hover', () => {
    expect(contrastRatio(ON_ACCENT, ACCENT.soft)).toBeGreaterThanOrEqual(AA_NORMAL);
  });
});

describe('the text ramp stays visually distinct', () => {
  it('each step is dimmer than the one before it', () => {
    const order = [TEXT.DEFAULT, TEXT.muted, TEXT.faint, TEXT.ghost];
    const ratios = order.map((color) => contrastRatio(color, BACKGROUND.DEFAULT));
    for (let i = 1; i < ratios.length; i += 1) {
      expect(ratios[i]).toBeLessThan(ratios[i - 1]);
    }
  });
});
