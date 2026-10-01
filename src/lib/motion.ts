/**
 * Brand motion identity (Premium): one signature curve, three durations,
 * one entrance pattern. See motion-design skill.
 */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.4, 0, 0.2, 1] as const;

export const duration = { quick: 0.2, base: 0.45, slow: 0.7 } as const;

export const entrance = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;
