# Orchestr design system — "Blueprint"

Source of truth: `src/app/globals.css` (`@theme` tokens, `@layer components`, motion
catalogue). This file explains the rules. If the two disagree, the CSS is right and this
file must be updated.

Visual reference: editorial institutional sites (a light misty background, a visible
dotted grid, square tiles, navy data panels, isometric line art).

## 1. Principles
1. **Structure is visible.** A dotted construction grid frames the page. Sections open on
   a rule with an index badge.
2. **Square, quiet, precise.** No radii on the interface, few colours, light headline
   weight, uppercase labels.
3. **One signal colour.** Blue marks action and state. Ink black carries the primary
   button and the badges.
4. **Data panels are navy.** The product and the key moments sit on deep navy, lit from
   below.
5. **Every effect is cheap.** Motion uses `transform`, `opacity` and `clip-path` only. It is
   scroll-driven where supported, uses no scroll handlers, pauses loops off-screen and
   respects reduced motion.
6. **Show, don't claim.** Illustrations are labelled illustrative. There are no invented
   clients, metrics or testimonials.

## 2. Colour
| Token | Value | Use |
|---|---|---|
| `mist` → `mist-2` → `paper-2` | `#C3D3E6` → `#DBE3EC` → `#F2F1EC` | page atmosphere (body gradient, static) |
| `fg` | `#0A0C10` | text, primary button, badges |
| `fg-2` | `#3A414B` | body copy |
| `fg-3` | `#5A636F` | metadata, secondary headline line (≥ 4.5:1 on paper) |
| `rule` | ink 22% | dotted rules |
| `hair` / `hair-2` | ink 10% / 18% | solid hairlines |
| `tile` / `tile-2` | white 34% / 55% | tiles, hover state |
| `chip` | `rgb(150 170 195 / .38)` | nav tiles, secondary buttons |
| `accent` | `#2B5BFF` | signal: arrow cells, markers, active state, focus ring |
| `accent-2` | `#1D47E0` | accent hover |
| `navy` → `navy-2` → `navy-3` → `sky` | `#040A17` → `#0B2049` → `#2A5AA6` → `#A9C3E6` | data panels (`.panel-navy`) |
| `amber` | `#E8A33A` | "pending" only |

Mockup tokens (`paper`, `ink`, `brand`, `mint` …) apply only inside product illustrations.

## 3. Typography
- **Mona Sans** (variable): display and body. **Martian Mono**: numbers, kickers, metadata.

| Role | Class / size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Hero | `.display` `clamp(42px, 4.5vw, 68px)` | 400 | −0.045em | 0.98 |
| Section title | `.h2` `clamp(36px, 5vw, 64px)` | 400 | −0.04em | 1.02 |
| Closing title | `.display` `clamp(40px, 5.4vw, 76px)` | 400 | −0.045em | 0.98 |
| Card title | 17–26px | 400 | −0.01 to −0.03em | snug |
| Body | 15–17px | 400 | — | 1.6 |
| Label | `.label` 10.5–12px uppercase | 600 | 0.09em | — |
| Kicker / meta | `.kicker` 10.5–11px mono uppercase | 500 | 0.08em | — |
| Badge | `.badge` 10.5px mono on ink (or white on navy) | 500 | — | 22px tall |

## 4. Grid, space, breakpoints
- **Frame**: `Container`, max 1360px, gutters 20 / 28px.
- **Editorial split**: section heads use `[1fr | 2fr]`, with the label on the left and the
  title on the right. The hero uses three equal columns, with dotted vertical rules in the
  gutters.
- **Section rhythm**: 80px on mobile and 112px from `sm` up. The gap between tiles is
  28px (`gap-7`), and between joined tiles 2px.
- **Breakpoints**: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.
- **Mobile is recomposed**:
  - the columns stack;
  - the vertical rules give way to horizontal ones;
  - the hero buttons go full width;
  - the methodology loses its pinned index;
  - a sticky glass CTA bar appears after the hero.

## 5. Shape and depth
- **Radius: 0** for tiles, buttons, badges, tabs and panels. Mockups keep 4–8px internally.
- **No drop shadows** on the interface. Depth comes from translucency (tiles over the
  atmosphere) and from navy panels. The only shadow is on the mobile CTA bar.
- **Glass**: only the header (after scrolling) and the mobile CTA bar (`.glass`: 72% mist,
  blur 16px). There is a fallback without `backdrop-filter`.

## 6. Components and states
### Buttons (`LinkButton`)
A label cell plus a separate square arrow cell, joined by 2px.

| Variant | Label | Arrow cell | Hover |
|---|---|---|---|
| `ink` (primary) | ink, white text | blue | the label fills from the left (darker); the arrow leaves right and a new one enters from the left; the arrow cell darkens |
| `mist` (secondary) | chip | chip | the label fills; the arrow cell turns ink |
| `light` (on navy) | white, navy text | blue | the label fills with soft blue |
| `glass` (on navy) | white 16% | white 16% | the label fills; the arrow cell turns white |

- Active: 1px press.
- Focus: 2px blue outline.
- Sizes: `sm` 36px, `md` 44px, `lg` 52px.
- Shortened labels pass `ariaLabel`.

### Tiles (`.tile` + `data-frame`)
On hover, blue corner brackets close in from outside, the tile brightens to `tile-2`, and
its isometric drawing "marches" (the dashes move) and lifts.

### Navigation
- The header is transparent over the hero. Once scrolled, it becomes a glass band with a
  dotted bottom rule.
- Desktop nav uses segmented chip tiles; the active section is an ink tile (scrollspy).
  The CTA is an ink + blue button.
- Mobile has a "Menu" tile, which opens numbered tile rows.

### Tabs (use cases)
Segmented tiles, with an ink tile sliding under the active one. They follow the ARIA tabs
pattern (Arrow/Home/End keys).

### FAQ
Rows on dotted rules. The "+" sits on a chip tile that turns ink when open, and the icon
rotates to "×". Native `<details name>`, with smooth height.

### Data panels (`.panel-navy`)
- A marker in the top-left corner.
- Labels at white 55–70%, values in regular weight, and dotted light rules
  (`.rule-light`).

### Isometric art (`IsoArt`)
Kinds: `chat`, `nodes`, `chart`, `calendar`, `doc`, `coins`, `clock` and `shield`. They are
built from boxes, planes, cylinders and lines in a 30° projection, with dashed strokes and
one solid blue part. Server-rendered SVG with no assets.

## 7. Motion catalogue
| Pattern | Attribute / class | Behaviour |
|---|---|---|
| Fade-up | `data-reveal` | rises 28–32px and fades in |
| Side entries | `data-reveal="left" \| "right"` | slides 40–48px from a side (sections clip on x) |
| Settle | `data-reveal="scale"` | from 92–94% |
| Heading wipe | `data-reveal="mask"` / `data-rise="mask"` | wipes up from a hard edge |
| Rules drawing | `data-draw="x" \| "y"`, `.load-draw-x/y` | dotted rules draw themselves |
| Markers | `data-pop`, `.load-pop` | blue squares and checks pop in, rotating |
| Drift rows | `data-drift` + `--from/--to` | rows slide sideways with the scroll (the "pending" backlog) |
| Chart lines | `.line-draw` (on load), `.line-draw-scroll` | clip wipe from left to right |
| Methodology | IntersectionObserver + `.process-fill` | pinned index, active phase, rail filling |
| Travel signal | `animate-travel` | a blue square runs along the rule between steps |
| Live board | `useStepper` | the counter ticks and the latest execution changes; pausable |
| Loops | `animate-marquee`, `animate-orbit`, `animate-blink` | paused off-screen (`data-loop`) |

- Easing: `ease-out-soft` `cubic-bezier(.22,1,.36,1)` for entrances and hovers, and
  `ease-in-out-soft` for travelling signals and chart lines.
- Durations: 200ms press, 300–500ms hover, 600–900ms reveal, 1.2–2.4s drawing.
- Reduced motion: everything is shown in its final state, loops and wipes are disabled, and
  hover transitions are removed.

## 8. Accessibility checklist
- Body text contrast ≥ 4.5:1 on paper and on navy. The focus ring is visible everywhere.
- Hit areas ≥ 36px (buttons 44–52px). Every clickable element has `cursor: pointer`.
- Skip link, landmarks, one `h1`, and ordered `h2`s with `aria-labelledby`.
- Decorative SVGs and grid lines are `aria-hidden`. Illustrations have text alternatives.
- Looping illustrations can be paused (WCAG 2.2.2).
