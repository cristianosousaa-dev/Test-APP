import { cn } from "@/lib/cn";
import { BRAND_DEFS, BRAND_ICONS, type Brand } from "./brand-icons";

export type { Brand };
export const brandLabel = (b: Brand) => BRAND_ICONS[b].label;
export const isBrand = (v: string): v is Brand => v in BRAND_ICONS;

/** Gradient definitions shared by all logos. Rendered once, kept in the layout (not display:none). */
export function BrandDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute" focusable="false">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, build-time generated SVG defs. */}
      <defs dangerouslySetInnerHTML={{ __html: BRAND_DEFS }} />
    </svg>
  );
}

/** Official brand mark, from the generated subset of open icon libraries. */
export function BrandIcon({ brand, className }: { brand: Brand; className?: string }) {
  const { viewBox, body } = BRAND_ICONS[brand];
  return (
    <svg
      viewBox={viewBox}
      className={cn("size-5 shrink-0", className)}
      aria-hidden
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, build-time generated SVG from vetted icon libraries.
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

/** Brand mark on a white app-style tile. */
export function BrandTile({
  brand,
  className,
  iconClassName,
}: {
  brand: Brand;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-[12px] bg-white shadow-[0_0_0_1px_rgb(17_19_21/0.08),0_4px_10px_-6px_rgb(17_19_21/0.25)]",
        className,
      )}
    >
      <BrandIcon brand={brand} className={cn("size-[22px]", iconClassName)} />
    </span>
  );
}

/** A tool name as a chip: official logo when we have one, otherwise a tidy monogram. */
export function ToolChip({ tool, className }: { tool: string; className?: string }) {
  const brand = isBrand(tool) ? tool : null;
  const label = brand ? brandLabel(brand) : tool;
  return (
    <span
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full bg-white/[0.05] pr-3.5 pl-1.5 text-[13.5px] font-medium text-fg shadow-[inset_0_0_0_1px_var(--color-hair-2)]",
        className,
      )}
    >
      {brand ? (
        <span className="grid size-6 place-items-center rounded-full bg-white">
          <BrandIcon brand={brand} className="size-[15px]" />
        </span>
      ) : (
        <span
          aria-hidden
          className="grid size-6 place-items-center rounded-full bg-white/10 font-mono text-[9.5px] text-fg-2"
        >
          {label.slice(0, 2).toUpperCase()}
        </span>
      )}
      {label}
    </span>
  );
}
