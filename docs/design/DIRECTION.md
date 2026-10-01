# Design direction — landing (v3: scroll-driven)

*ECC `frontend-design-direction` + `liquid-glass-design` (principles adapted to the web) + `motion-design` + `make-interfaces-feel-better`.*

## Direction
- **Purpose:** an owner of a small business sees, in the first viewport, their own day being handled: messages answered, bookings made, invoices paid.
- **Audience:** non-technical owners (clinics, workshops, real estate, restaurants, shops). They scan for "does this solve my problem?", not for tech.
- **Tone:** calm, light, precise. Apple-like clarity, not a startup template.
- **Memorable detail:** liquid-glass notifications arrive over a real-looking week calendar, and the calendar behind them fills in as each booking lands. The glass sits on *content*, not on decorative blobs.

## Anti-slop rules (non-negotiable)
- No gradient text, no purple/indigo→cyan gradients, no glow blobs, no dotted grids, no sparkles icons, no emoji.
- No eyebrow pills with dots, no icon-in-tinted-square card grids, no bento with a dark hero card.
- No centered-everything layout: editorial left-aligned grid, centered only where it earns it.
- No node-graph "workflow" diagrams: previews show what the owner actually sees (chat, agenda, quote, pipeline, invoices).
- Fonts: no Inter, Geist, DM Sans, Plus Jakarta, Outfit, Space Grotesk, Instrument Serif. **Mona Sans** only (variable width + weight), weights 400–600, never heavier.
- Copy: concrete nouns and verbs; no "seamless", "supercharge", "24/7 magic", no "Tudo o que precisa de saber".
- Glass only where it means something: floating navigation, segmented control, notifications/widgets layered over content. Everything else is plain, flat, hairline-separated.

## Tokens
| Token | Value | Use |
|---|---|---|
| `canvas` | `#F4F5F7` | page |
| `paper` | `#FFFFFF` | content surfaces under glass |
| `ink` | `#0F1012` | text |
| `ink-2` | `#41444B` | secondary text |
| `mute` | `#6B6F78` | tertiary (≥ 4.5:1 on canvas) |
| `hair` | `rgb(15 16 18 / 0.08)` | hairlines |
| Pastels (bg / fg) | sage `#E3EFE6/#2F6B47`, sky `#E1ECF8/#285A92`, sand `#F4EADB/#80571F`, rose `#F7E3E5/#93394A`, lilac `#EBE7F7/#54469A` | calendar events, statuses — multi-hue, never one family |
| `go` | `#1E8E5A` | done / paid |

## Liquid glass recipe (web)
Translucent white (55–70%) + `backdrop-filter: blur(20px) saturate(180%)` + inner top highlight + hairline inner ring + specular rim (masked gradient border) + soft two-layer drop shadow. Only on layers that sit over real content. Text on glass stays ≥ 4.5:1.

## Motion
- Springs, no bounce: `{ type: "spring", duration: 0.6, bounce: 0 }` for movement; 0.2 s fades.
- One thing moves at a time per preview; loops pause off-screen and honour reduced motion / the pause toggle.
- Layout animations for things that move between places (pipeline cards, agenda slots).

## v3: scroll as the connective tissue
- **Backdrop:** fixed layer of soft pastel light fields behind the page. Each section (and each example chapter) sets a mood; moods crossfade (opacity only), the field drifts slowly and turns/rises with scroll. Grain on top so it never bands. Pauses with the pause toggle and reduced motion.
- **Hero:** words rise out of masks (CSS, before hydration); the calendar leans towards the pointer; on scroll the copy lifts away faster than the stage, handing over to the examples.
- **Examples:** one pinned stage; each scroll unit advances one step, chapters hand over with a blur crossfade, the backdrop follows. Chapters, steps and connected tools are clickable and scroll to their moment.
- **Automations:** "Quando → Faz" rule cards per area, pointer-following light, animated flow line.
- **Process:** a line draws through the four steps with the scroll and lights each one.
- **Closing:** a dark card opens to the screen edges as it scrolls in; the nav glass turns dark over it.
- **Interaction:** every clickable element has `cursor: pointer`, hover and press states; primary CTAs are magnetic with a light sweep and a sliding arrow.

## v5: say what each part does, in glass
- **Liquid glass everywhere it carries content:** stages, rule cards, process cards, FAQ, before/after, closing takeaways. One pointer-tracked specular light (viewport-fixed) moves across every glass surface; `.glass-panel` for large surfaces, `.glass-dark` on the closing card.
- **Clarity per section:** hero legend (notification = automation working, line = what it updated, green = done); every example shows "Hoje, à mão" vs "Com a automação"; rules play out trigger → signal → done; each process step states what you receive; the closing card lists what you take from the call.
- **Motion:** rule cards run in sequence, cards lean towards the pointer, process icons spin in as the scroll line reaches them, takeaways tick one by one.
