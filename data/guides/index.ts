import type { Guide } from '@/types/guide';
import { positionSizeGuide } from './position-size';
import { riskRewardGuide } from './risk-reward';
import { riskManagementFrameworkGuide } from './risk-management-framework';
import { leverageGuide } from './leverage';
import { stopLossPlacementGuide } from './stop-loss-placement';
import { drawdownRecoveryGuide } from './drawdown-recovery';

/**
 * Deliberately ordered as a reading path rather than alphabetically:
 * position size first (the foundation), then the two planning concepts that
 * sit next to it, then the framework that ties them together, then the two
 * guides that go deeper on a single risk factor each.
 */
export const ALL_GUIDES: Guide[] = [
  positionSizeGuide,
  riskRewardGuide,
  stopLossPlacementGuide,
  riskManagementFrameworkGuide,
  leverageGuide,
  drawdownRecoveryGuide,
];
