import type { ComponentType } from "react";

export interface StageProps {
  step: number;
  cycle: number;
  /** Motion allowed (no reduced motion, not paused). */
  animate: boolean;
  /** Motion allowed and visible: ambient loops may play. */
  running: boolean;
}

export interface PreviewConfig {
  id: string;
  tab: string;
  sector: string;
  title: string;
  description: string;
  /** One label per step; the stage receives the current step index. */
  steps: string[];
  durations: number[];
  outcomes: string[];
  Stage: ComponentType<StageProps>;
}
