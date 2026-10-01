# Design direction — landing (history v6–v7; v8 identity: see docs/brand/)

## Why v6
v2–v5 piled on heavy effects (fixed animated backdrop, backdrop-filter glass on dozens of
elements, pointer-tracked light, pinned scroll sections, scroll-linked transforms, a
motion library). The page felt clunky and could crash on modest devices. v6 starts again
with one rule: **every effect must be cheap**.

## Performance rules
- No animation library. CSS transitions/keyframes on `transform` and `opacity` only.
- One `backdrop-filter` (the sticky header, only once scrolled).
- No scroll handlers: IntersectionObserver for reveals, the header state and the scrollspy.
- Looping illustrations run only while on screen and the tab is visible, and have a Pause
  button (WCAG 2.2.2). Reduced motion shows final states with no movement.
- Normal document flow: no pinned/sticky storytelling sections.

## Palette (calm, with meaning)
| Token | Value | Meaning |
|---|---|---|
| `paper` | `#F6F5F1` | page |
| `ink` | `#111315` | text |
| `brand` | `#1F6F4A` forest green | **automatic / done**: CTAs, ticks, highlights |
| `brand-soft` | `#E4F1E9` | "with the automation" surfaces |
| `amber` | `#F2B33D` | **trigger** (something happened), the drawn underline, current step |
| `mint` | `#8EDDB0` | green on dark surfaces |
| `night` | `#0F1513` → `#1F2925` | live feed, process, closing card |

## Logos
Official marks from open libraries, generated into a small module by `pnpm icons`
(`scripts/build-brand-icons.mjs`): Iconify **logos** (CC0), Iconify **vscode-icons** (MIT,
Outlook/Excel) and **Simple Icons** (CC0). Gradients are hoisted into one shared `<defs>`
sprite. Portuguese tools without an open-licence logo (Moloni, InvoiceXpress, PHC,
Primavera, MB WAY) are shown as name chips until official SVGs are supplied.

## Motion (lively, still light)
- Reveals use CSS scroll-driven animations (`animation-timeline: view()`), with an
  IntersectionObserver fallback; reveal and hover never share an element.
- Spotlight hover on cards (pointer-following light + border), one delegated listener.
- Floating logo tiles (CSS bob), drawn underline in the hero, sliding tab thumb,
  one-shot sequences inside cards, travelling dot between "how it works" steps.

## Page structure (each section answers one question)
1. Header — sticky, scrollspy underline in lime, one CTA.
2. Hero — what we do, in one sentence; a live feed of tasks finishing on their own.
3. Tools — what it connects to.
4. Como funciona — trigger → automation → done, in three cards.
5. Exemplos — four tabbed, step-by-step previews with "Hoje, à mão" vs "Com a automação".
6. Serviços — what can be automated, by area.
7. Processo — four steps and what you receive in each.
8. Perguntas — FAQ.
9. CTA — lime block, what you take from the free call.
10. Footer — brand, links, contact.
