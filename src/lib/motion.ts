import type { Transition } from "motion/react";

/** No-bounce spring for anything that moves. */
export const spring: Transition = { type: "spring", duration: 0.6, bounce: 0 };
/** Slightly slower spring for larger surfaces. */
export const springSlow: Transition = { type: "spring", duration: 0.9, bounce: 0 };
/** Quiet fade for appear/disappear. */
export const fade: Transition = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };

export const instant: Transition = { duration: 0 };
