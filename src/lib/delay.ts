import type { CSSProperties } from "react";

/** Inline stagger for reveal/rise animations: sets the --d delay custom property. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
