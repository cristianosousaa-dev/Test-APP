import type { ComponentType } from "react";
import type { BackdropTheme } from "@/lib/backdrop";

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
  outcomes: string[];
  /** The tools this automation touches, lit from the step where each joins in. */
  tools: { label: string; at: number }[];
  theme: BackdropTheme;
  Stage: ComponentType<StageProps>;
}
