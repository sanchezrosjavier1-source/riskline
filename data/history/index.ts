import type { HistoryEvent } from '@/types/history';
import { earlyCrashesEvents } from './early-crashes';
import { financialCrisisEraEvents } from './financial-crisis-era';
import { mid2010sEvents } from './mid-2010s';
import { recentEvents } from './recent-events';
import { events2023to2025 } from './2023-2025';

/** Chronological order, oldest first — matches how the index page presents them. */
export const ALL_HISTORY_EVENTS: HistoryEvent[] = [
  ...earlyCrashesEvents,
  ...financialCrisisEraEvents,
  ...mid2010sEvents,
  ...recentEvents,
  ...events2023to2025,
].sort((a, b) => a.year - b.year);
