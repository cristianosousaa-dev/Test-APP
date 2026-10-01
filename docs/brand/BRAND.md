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
- **Tagline:** *Automação de processos para PME.* Hero: *Automatize o repetitivo. Foque-se no negócio.*
- **Voice:** PT-PT, professional and institutional. Address the reader formally ("a sua
  empresa"). Use business vocabulary (processos, implementação, integração, entregável) and
  short, declarative sentences. No colloquialisms, exclamation marks, invented numbers or
  superlatives. Customer messages inside illustrations may stay informal, because they
  represent real customers.

## Logo
### Symbol
Three arcs around a centre point: the sections of an orchestra around the conductor, or the
tools around the business. The three gaps suggest motion (a cycle that runs by itself).
- Grid: 32 × 32. Arcs: radius 11, centred at (16,16), spanning [-78°, 6°], [42°, 126°] and
  [162°, 246°], stroke 3.4 with round caps. Centre dot: radius 3.4.
- Colour on dark (navy): gradient `#FFFFFF → #C9D8F2 → #7C9CFF`, dot `#5C86FF`.
- Colour on light (primary use): ink `#0A0C10`, dot signal blue `#2B5BFF`.
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
| `orchestr-logo-on-light.svg` | primary lockup, light backgrounds |
| `orchestr-logo-on-dark.svg` | lockup, navy/dark backgrounds |
| `orchestr-symbol.svg` | symbol only, gradient (dark backgrounds) |
| `orchestr-symbol-mono-dark.svg` | single colour, for dark backgrounds |
| `orchestr-symbol-mono-light.svg` | single colour, for light backgrounds |
| `orchestr-app-icon.svg` | app icon / avatar (navy tile `#06122A`) |
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
- Don't put the gradient symbol on light backgrounds: use the ink version.
- Don't add effects (shadow, glow, outline) to the logo.

## Graphic language ("Blueprint")
- **Atmospheric light page**: mist blue at the top settling into warm paper. No dark mode.
- **A visible construction grid**: dotted rules between columns and sections, drawn in as
  the page scrolls, with small signal-blue squares marking corners.
- **Square everything**: tiles, buttons, badges and tabs have no radius. Only the product
  mockups (app UIs) keep their own small radii.
- **One signal colour**: blue `#2B5BFF` for action and state. Ink black for primary
  buttons and index badges.
- **Navy data panels** (the hero board, the comparison column, the closing panel), lit from
  below, carry the "product" and the most important moments.
- **Isometric line art** (dashed strokes with one solid blue part) as the illustration
  language. It is generated in code (`IsoArt`).
- **Type**: Mona Sans at regular weight for large headlines (tight tracking), uppercase
  semibold labels for interface, Martian Mono for numbers and metadata.
- **Official tool logos** on white squares. Portuguese tools without an open logo are
  shown by name.

The complete design system is in [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).
