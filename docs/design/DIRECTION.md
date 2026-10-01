# Design direction — landing (v6: light, clear, fast)

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

## Palette (catchy, with meaning)
| Token | Value | Meaning |
|---|---|---|
| `paper` | `#F5F4EF` | page |
| `ink` | `#0E0F12` | text, dark surfaces |
| `lime` | `#D4FF3A` | **automatic / done**: CTAs, ticks, highlights |
| `violet` | `#6B4EFF` | **trigger**: something happened |
| `night` | `#0E0F12` → `#22242A` | the live feed, the process section |

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
