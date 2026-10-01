# Orchestr: brand identity

## Name
**Orchestr**: the name the client chose. It reads "orchestrate". The business takes the
tools a company already uses (WhatsApp, email, calendar, invoicing, spreadsheets) and makes
them play together, so the owner no longer has to conduct every task by hand. The dropped
final "a" makes it feel like a product and gives a short, distinctive wordmark.

> **Before launch: run a trademark and domain search** (INPI for Portugal, EUIPO for the EU,
> plus WIPO Global Brand Database). Similar names already exist in other sectors and
> countries, for example "Orchestr Global Payments" (payments), "Orchestra" (orch.so),
> "Orkestro" and the "Orchestr8" trademark. The risk of confusion depends on the class of
> goods/services and the territory, and needs legal confirmation.

## Positioning
- **What:** custom automations for SMEs ("automações à medida").
- **For whom:** small and medium-sized businesses in Portugal: clinics, workshops, real estate
  agencies, restaurants, online shops, offices and services.
- **Main benefit:** repetitive work happens on its own, inside the tools the business
  already uses.
- **Next action:** book a free 30-minute diagnosis.
- **Tagline:** *O seu negócio, em piloto automático.*
- **Voice:** PT-PT, formal ("o seu negócio"), short sentences, concrete examples. No jargon,
  no invented numbers, no superlatives.

## Logo
### Symbol
Three arcs around a centre point: the sections of an orchestra around the conductor, or the
tools around the business. The three gaps suggest motion (a cycle that runs by itself).
- Grid: 32 × 32. Arcs: radius 11, centred at (16,16), spanning [-78°, 6°], [42°, 126°] and
  [162°, 246°], stroke 3.4 with round caps. Centre dot: radius 3.4.
- Colour on dark: gradient `#B6F7DD → #3DE0A0 → #7C8BFF` (mint to indigo), dot `#3DE0A0`.
- Colour on light: ink `#07090B`, dot `#13935F`.
- Legible at 16 px (favicon) because it uses only three thick strokes and a dot.

### Wordmark
"orchestr" in lowercase, **Mona Sans** at width 112 and weight 600, tracking −0.03 em,
converted to outlines (no font dependency). Lowercase makes it approachable; the wide cut
makes it feel technical and premium.

### Lockup
Symbol + wordmark on a 32-unit height, 9-unit gap. Clear space all round = the height of
the centre dot × 2. Minimum size: 20 px high (lockup), 16 px (symbol alone).

### Files (`public/brand/`)
| File | Use |
|---|---|
| `orchestr-logo-on-dark.svg` | primary lockup, dark backgrounds |
| `orchestr-logo-on-light.svg` | lockup, light backgrounds |
| `orchestr-symbol.svg` | symbol only, gradient (dark backgrounds) |
| `orchestr-symbol-mono-dark.svg` | single colour, for dark backgrounds |
| `orchestr-symbol-mono-light.svg` | single colour, for light backgrounds |
| `orchestr-app-icon.svg` | app icon / avatar (dark tile) |
| `src/app/icon.svg` | favicon |

In React: `OrchestrLogo` and `OrchestrMark` (`src/components/brand/OrchestrLogo.tsx`). Each
instance on a page needs a unique `id` (it names its gradient).

To regenerate after changing the geometry:
```bash
npx -y -p fontkit@2 node scripts/build-brand-logo.mjs path/to/MonaSans.ttf
```
(The font must be a TTF with variation axes. A WOFF2 has to be decompressed first.)

### Don'ts
- Don't recolour the gradient, rotate the symbol or change the gap between the arcs.
- Don't put the gradient symbol on light backgrounds: use the mono or light version.
- Don't add effects (shadow, glow, outline) to the logo.

## Graphic language
- **Dark, quiet base** with **one luminous accent** (signal mint). Indigo appears only as
  atmosphere (gradients and light), never as a second action colour.
- **Liquid glass where something sits on top of something else** (header, product window,
  floating cards, contact card). Flat cards use `surface`, which has no blur.
- **The product as an illustration**: light app windows (WhatsApp, calendar, invoices)
  inside the dark page, so the "with automation" result is the brightest thing on screen.
- **Mono labels** (Martian Mono, uppercase, wide tracking) for kickers, metadata and state.
- **Official tool logos** (open libraries, see `docs/design/DIRECTION.md`). Portuguese tools
  without an open logo are shown by name.

The complete design system is in [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).
