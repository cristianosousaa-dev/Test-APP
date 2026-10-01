import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import type { Brand } from "@/components/brand/BrandIcon";

export interface PreviewProps {
  step: number;
}

export interface Example {
  id: string;
  tab: string;
  /** Official logo of the main tool, or a generic icon when there is none. */
  mark: Brand | LucideIcon;
  sector: string;
  title: string;
  before: string;
  after: string;
  steps: string[];
  durations: number[];
  /** Brand keys render with their official logo; other names render as chips. */
  tools: string[];
  Preview: ComponentType<PreviewProps>;
}
