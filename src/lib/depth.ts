/* Poses for <ScrollDepth>. They live here, not in the client component, so server components can
   import them as plain values. Only transform and opacity: they run on the compositor. */
export type Pose = {
  rotateX?: number;
  rotateY?: number;
  y?: number;
  scale?: number;
  opacity?: number;
};

/** Resting pose. */
export const FLAT: Pose = { rotateX: 0, rotateY: 0, y: 0, scale: 1, opacity: 1 };
/** A block that leans back and rises into place as it comes into view. */
export const RISE: Pose = { rotateX: 9, y: 56, scale: 0.97, opacity: 0.35 };
/** The hero window leaning back into depth as the page scrolls away from it. */
export const HERO_AWAY: Pose = { rotateX: 16, y: 60, scale: 0.94, opacity: 0.3 };
