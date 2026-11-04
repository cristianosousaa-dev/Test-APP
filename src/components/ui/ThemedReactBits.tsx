"use client";

import type { ComponentProps } from "react";
import ShinyText from "@/components/react-bits/ShinyText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import StarBorder from "@/components/react-bits/StarBorder";
import { useTheme } from "@/lib/theme";

/* React Bits picks its palette from a `theme` prop; these wrappers feed it the site's theme. */

export function ThemedSpotlightCard(props: ComponentProps<typeof SpotlightCard>) {
  const theme = useTheme();
  return (
    <SpotlightCard
      theme={theme}
      spotlightColor={theme === "dark" ? "rgba(123, 155, 255, 0.2)" : "rgba(43, 91, 255, 0.16)"}
      {...props}
    />
  );
}

export function ThemedStarBorder(props: ComponentProps<typeof StarBorder>) {
  const theme = useTheme();
  return <StarBorder theme={theme} color={theme === "dark" ? "#7b9bff" : "#2b5bff"} {...props} />;
}

export function ThemedShinyText(props: ComponentProps<typeof ShinyText>) {
  const theme = useTheme();
  return (
    <ShinyText
      color={theme === "dark" ? "#9fb0cc" : "#46526b"}
      shineColor={theme === "dark" ? "#ffffff" : "#0a0c10"}
      {...props}
    />
  );
}
