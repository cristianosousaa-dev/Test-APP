"use client";

import { type ReactNode, useRef } from "react";
import { type BackdropTheme, useBackdropOnView } from "@/lib/backdrop";

/** Wraps server-rendered content and sets the page backdrop mood while it is centred. */
export function ThemeZone({ theme, children }: { theme: BackdropTheme; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useBackdropOnView(ref, theme);
  return <div ref={ref}>{children}</div>;
}
