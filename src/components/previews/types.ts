import type { ComponentType } from "react";
import type { App } from "@/components/ui/AppIcon";

export interface PreviewProps {
  step: number;
}

export interface Example {
  id: string;
  tab: string;
  app: App;
  sector: string;
  title: string;
  before: string;
  after: string;
  steps: string[];
  durations: number[];
  tools: string[];
  Preview: ComponentType<PreviewProps>;
}
