# Orchestr design system

Source of truth: `src/app/globals.css` (`@theme` tokens + `@layer components`). This
document explains the rules. If the two disagree, the CSS is right and this file must be
updated.

## 1. Principles
1. **One accent, used for action.** Mint marks what you can do (CTA) and what is done
   (ticks). Anything else is neutral.
2. **Depth only where there is something behind.** Glass for layers, flat surfaces for cards.
3. **Every effect must be cheap.** Animate `transform` and `opacity` only, use no scroll
   handlers, run no loops off-screen, and respect `prefers-reduced-motion`.
4. **Show, don't claim.** Illustrations show the work happening. They don't use invented
   metrics, clients or testimonials.

## 2. Colour
### Page (dark)
| Token | Value | Use |
|---|---|---|
| `base` | `#07090B` | page background |
| `base-2` | `#0B0E11` | contact section, rings that cut through images |
| `raised` | `#11151A` | solid raised surfaces |
| `fg` | `#F2F5F4` | primary text |
| `fg-2` | `#AAB2AF` | secondary text, body copy (contrast ≈ 9:1 on base) |
| `fg-3` | `#7D8582` | metadata, labels (≈ 5:1, AA) |
| `hair` / `hair-2` | white 8% / 14% | borders, dividers |

### Brand
| Token | Value | Use |
|---|---|---|
| `accent` | `#3DE0A0` | CTAs, ticks, active state, focus ring |
| `accent-2` | `#72ECBD` | accent hover |
| `accent-ink` | `#03140D` | text on accent (≈ 12:1) |
| `indigo` | `#6E7BFF` | atmosphere only (gradients, glows, the end of the logo gradient) |

### Product illustrations (light app UI inside the dark page)
`paper #F6F6F3`, `card #FFF`, `ink #101314`, `ink-2`, `mute`, `line`, `brand #13935F`,
`brand-soft`, `amber` (trigger / waiting), `sky`, `rose` (before / problem). These colours
only appear inside mockups.

### Gradients
- **Brand gradient:** `#B6F7DD → #3DE0A0 → #7C8BFF`. Used for the logo and the second line
  of the hero headline. Nowhere else.
- **Ink sheen** (`.ink-sheen`): white → 62% white, vertical, on large headings.
- **Atmosphere:** radial glows of accent (≤ 22%) and indigo (≤ 20%) at section corners.
  They are static.

## 3. Typography
- **Mona Sans** (variable, `wdth` axis), via `next/font`. Display weights use
  `font-stretch: 110–112%`. The wide cut gives the brand its voice without a second family.
- **Martian Mono** 400/500 for kickers, labels, metadata and step numbers.

| Role | Class / size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Hero | `.display` `clamp(44px, 8.4vw, 96px)` | 600, stretch 112% | −0.04em | 1.02 |
| Section title | `.h2` `clamp(34px, 4.6vw, 56px)` | 600, stretch 110% | −0.035em | 1.06 |
| Closing title | `.display` `clamp(38px, 6vw, 68px)` | 600 | −0.04em | 1.02 |
| Card title | 19–22px | 600, stretch 106% | −0.02em | snug |
| Lead | 17.5–18px | 400 | — | 1.6–1.65 |
| Body | 15–16px | 400 | — | 1.6 |
| Small | 13.5–14.5px | 400–500 | — | 1.5 |
| Kicker | `.kicker` 11.5px mono uppercase | 500 | 0.1em | — |

Headings use `text-wrap: balance`, and paragraphs use `pretty`. Changing numbers use
`tabular-nums`.

## 4. Space, grid, breakpoints
- **Base unit 4px.** The common steps are 8, 12, 16, 20, 24, 32, 40, 56, 64 and 96.
- **Section rhythm:** `py-24` (96px) on mobile, `sm:py-32` (128px) and up.
- **Container:** `max-w-[1200px]`, gutters 20px (mobile) and 32px (≥ 640px).
- **Grids:** 1 column on mobile, then 2 (`sm`/`md`), then 3–4 (`lg`). Card gap is 16px.
- **Breakpoints** (Tailwind defaults): `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- **Mobile is recomposed, not shrunk.** Floating cards are hidden. The process becomes a
  vertical timeline, CTAs go full width, the header becomes a menu, and a sticky CTA bar
  appears after the hero.

## 5. Radius
`xs 8` · `sm 12` · `md 16` · `lg 24` (cards) · `xl 32` (product window, preview frame) ·
36 (closing section) · pill (buttons, chips, tabs). For nested rounded shapes, the outer
radius = the inner radius + the padding.

## 6. Surfaces, glass, shadows
| Class | What | Where |
|---|---|---|
| `.surface` | white 5% → 2% gradient, 1px inner hairline, top highlight, soft drop shadow, **no blur** | all cards |
| `.glass` | white 9% → 3.5%, `backdrop-filter: blur(22px) saturate(160%)`, brighter hairline, specular top edge | header, hero window, floating cards, preview frame, contact card |

- Both have a **specular edge**: a 1px highlight along the top that fades at the corners.
- Shadows are soft and dark (`0 24px 48px -32px rgb(0 0 0 / .8)`). A coloured glow is used
  only on the accent button and the "Com a Orchestr" card.
- Budget: **no more than ~10 elements with `backdrop-filter`** on the page. There is a
  fallback when `backdrop-filter` is unsupported.

## 7. Components and states
### Buttons (`LinkButton`, `.btn-*`)
| Variant | Rest | Hover | Active | Focus |
|---|---|---|---|---|
| `accent` | mint, dark text, mint glow | lighter mint, larger glow, lifts 1px, light sweep | scale .98 | 2px mint outline, offset 3 |
| `glass` | white 6%, hairline | white 10%, brighter hairline, lift, sweep | scale .98 | same |
| `light` | white, dark text | mint-tinted white | scale .98 | same |

Sizes: `sm` 36px, `md` 44px, `lg` 52px. Shortened labels pass `ariaLabel`. Every action on
this page is a link (mailto/anchor), so no loading state is needed. If a form is added,
`.btn` gets `[aria-busy]` with a spinner that replaces the arrow.

### Cards
- `data-spot`: on hover the card lifts 4px, a mint border light follows the pointer, and a
  faint inner glow appears. Never put `data-reveal` on the same element (the reveal
  animation would pin the transform). Wrap it instead.
- Icon tiles: 44px, `accent/10` background, `accent/25` ring. On hover they tilt −6° or
  scale 1.05.

### Tabs (examples)
A segmented control with a sliding glass thumb. It follows the ARIA tabs pattern
(Arrow/Home/End keys). The active tab is `fg`, and the others are `fg-2`.

### FAQ
Native `<details name="faq">` (exclusive), with smooth height where
`::details-content` is supported. The open item gets a mint hairline, and the plus icon
rotates into a mint ×.

### Header
Floating island (max 1180px, radius 20). It is transparent at the top and becomes glass
after the first scroll (sentinel + IntersectionObserver). The scrollspy shows a pill on the
active link. The CTA is always visible.

## 8. Motion
| Token | Value |
|---|---|
| `ease-out-soft` | `cubic-bezier(.22, 1, .36, 1)` (signature curve: entrances, hovers) |
| `ease-in-out-soft` | `cubic-bezier(.65, 0, .35, 1)` (travelling signals) |
| Durations | 200ms (press), 300–400ms (hover), 450–600ms (state), 900ms (reveal) |

| Pattern | How |
|---|---|
| Above-the-fold entrance | `data-rise`: CSS keyframe that fades and rises 18px with a 6px blur, staggered via `--d` |
| Scroll reveal | `data-reveal`: scroll-driven (`animation-timeline: view()`) where supported, with an IntersectionObserver fallback. Stagger via `--i` |
| Parallax | `data-parallax` + `--depth`: decorative layers drift on scroll (scroll-driven only) |
| Hero window | `data-zoom`: tilts from 10° to flat as it enters |
| Process rail | `.process-fill(-y)`: the line fills as the steps scroll past |
| Sequences | `.seq`: children appear one after another once revealed |
| Loops | `animate-bob`, `animate-travel`, `animate-marquee`, `animate-orbit`: paused off-screen (`data-loop`) |
| Previews | `useStepper`: steps advance only while visible and the tab is active. They have a Pause button and jump to the final state under reduced motion |

Under `prefers-reduced-motion: reduce`, all of the above are disabled. Content is shown in
its final state and hover lifts are removed.

## 9. Imagery and icons
- UI icons: **lucide-react**, 1.8–2px stroke, 16–20px.
- Tool logos: official marks (see `docs/design/DIRECTION.md`), shown on white tiles or
  circles so their colours stay true on dark.
- Illustrations are labelled *Ilustração* / *Exemplo ilustrativo · nomes e valores
  fictícios*.

## 10. Accessibility checklist
- Text contrast ≥ 4.5:1 (body) and ≥ 3:1 (large). The focus ring is visible on every
  interactive element.
- Hit areas are ≥ 40px. Every clickable element shows `cursor: pointer`.
- Skip link, landmarks, one `h1`, ordered `h2`s with `aria-labelledby` on sections.
- Decorative layers are `aria-hidden`. Logos have accessible names where they carry meaning.
- Motion can be paused, and it respects the reduced-motion setting.
