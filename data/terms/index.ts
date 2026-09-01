import type { Term } from '@/types/dictionary';
import { basicsTerms } from './basics';
import { ordersTerms } from './orders';
import { riskTerms } from './risk';
import { technicalTerms } from './technical';
import { indicatorTerms } from './indicators';
import { structureTerms } from './structure';
import { stockTerms } from './stocks';
import { optionTerms } from './options';
import { forexTerms } from './forex';
import { cryptoTerms } from './crypto';
import { psychologyTerms } from './psychology';

/** Every term in the dictionary, sorted alphabetically by display name. */
export const ALL_TERMS: Term[] = [
  ...basicsTerms,
  ...ordersTerms,
  ...riskTerms,
  ...technicalTerms,
  ...indicatorTerms,
  ...structureTerms,
  ...stockTerms,
  ...optionTerms,
  ...forexTerms,
  ...cryptoTerms,
  ...psychologyTerms,
].sort((a, b) => a.term.localeCompare(b.term, 'en-US'));
