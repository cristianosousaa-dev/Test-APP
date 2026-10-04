import type { LucideIcon } from "lucide-react";
import type { Brand } from "@/components/brand/BrandIcon";

/** A node's icon: an official brand logo, or a core-node glyph drawn in `tone`. */
export type NodeIcon = Brand | { glyph: LucideIcon; tone: string };

export interface SubNode {
  icon: NodeIcon;
  label: string;
}

export interface FlowNode {
  id: string;
  kind: "trigger" | "action" | "logic" | "agent";
  /** Centre of the node, in stage units (the stage is 1040 × 400). */
  x: number;
  y: number;
  icon: NodeIcon;
  /** Bold line under the node: the app or node type. */
  app: string;
  /** Second line: what this step does. */
  title: string;
  /** Data the step produced, shown once it has run. */
  output?: string;
  bubble?: "top" | "bottom";
  /** Agent nodes only: model, memory and tools hanging below. */
  subs?: SubNode[];
}

export interface FlowEdge {
  from: string;
  to: string;
  /** IF nodes: which output the edge leaves from. */
  port?: "yes" | "no";
  items?: string;
}

export interface Flow {
  id: string;
  tab: string;
  mark: Brand;
  /** Shown in the editor breadcrumb. */
  name: string;
  before: string;
  after: string;
  saving: string;
  runtime: string;
  /** Stage size in units, when the flow is drawn for a smaller frame (default 1040 × 440). */
  stage?: readonly [number, number];
  nodes: FlowNode[];
  edges: FlowEdge[];
  /** Node ids in execution order; nodes on branches that do not run are left out. */
  order: string[];
}
