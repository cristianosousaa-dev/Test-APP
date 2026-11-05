# Orchestr design system: "hairline"

Source of truth: `src/app/globals.css` (tokens, `.ios-*` preview parts, `.sv-*`, `.pc-*`).
This file explains the rules. If the two disagree, the CSS is right and this file must be
updated. (It replaces the earlier "Blueprint" system: dotted grid, square tiles, isometric art.)

## 1. Principles
1. **Hairline, not boxes.** 1px borders, small radii (10px windows, 7px buttons), no shadows
   and no cards inside windows, no gradients in previews.
2. **Previews are the product.** Every demo window shows illustrative data (made-up names and
   values) and says so. No invented clients, metrics or testimonials.
3. **One accent.** Blue marks action and state. Ink carries the primary button.
4. **Data in a second voice.** Numbers, dates and kickers in Martian Mono; everything else in
   Mona Sans.
5. **Motion is cheap and meaningful.** `transform` and `opacity` only. One clock: Lenis runs on
   GSAP's ticker and ScrollTrigger shares it. CSS view timelines where supported. Loops pause
   off-screen and have a visible pause. Reduced motion: nothing moves.
6. **Both themes are designed** (`html[data-theme]`), switched with a soft cross-fade.

## 2. Voice
- Verbs: "desenvolvemos", not "construímos". No "de raiz", no calques such as "de prateleira".
- Portuguese (pt-PT), always "você" forms: Veja, Explique, Pode, a sua. Never tu forms.
- Prices are always "desde" (before VAT). Never "preço fixo". The final value is in the written
  proposal.
- The pre-sale demo is a **protótipo** with the client's data, never "the app working".
- The brand is the idea: "Orchestr, o futuro da sua empresa." Use the music metaphor once or
  twice (hero, closing), not in every title.
- Cover the whole job, not only spreadsheets: old software, processes without logic, work done
  by hand or on the phone, websites, new opportunities.
- Do not repeat a claim across sections. "Personalizado" appears once as a promise, not as a
  tag on every plan.

## 3. Palette: the Strict.Dev green
Taken from the live strict-dev.com CSS, so the two sites read as one family: forest green `#2F5E50`
as the accent on light, mint `#7FD8BD` on dark, with green-tinted neutrals. Tried and rejected:
cobalt blue (same as BOOKLIN), ember orange on ivory (a generated default), burgundy (read as red
and pink).
| Role | Light | Dark |
|---|---|---|
| Stage / page | `#FBFCFB`, `#F2F5F3` | `#0B0F0E`, `#101513` |
| Ink | near-black, body and meta in green-grey | `#F5F7F6` and softer steps |
| Accent | `#2F5E50` (7:1 on white) | `#7FD8BD` |
| Deep tones | `#234A3E` hover | `#14201C` raised surfaces |
Status colours in previews (green ok, amber warning) stay apart from the accent. Third-party logos
keep their own colours. Mock UIs that imitate other software (the Excel sheet) stay as they are.
To change palette, map the hex values of this section across `globals.css` and the files that repeat
them (logo, OG image, manifest, ThemedReactBits, flows data).

## 3a. Hero background: a staff
`HeroStaff`: five hairlines and four bar lines along the foot of the hero, with six small notes
(each with a short trail) crossing slowly, 58 to 100 seconds per crossing. It says what the product
does: work moving between people, processes and programs, in an orchestra. Transform only, hidden
from assistive tech, notes hidden under reduced motion.

## 3b. Header: a plain bar with two useful things
Solid, flat, sticky; no glass pill. Links in sentence case; the section being read is marked with a
2px accent line under its link. "Serviços" opens a menu with every area (icon, name, what it
replaces), each going straight to its example in the services section. A thin line along the bottom
shows how far down the page you are (ScrollTrigger scrub on the Lenis clock). On phones the links
fold into a menu.

## 4. Tokens (preview scope)
`.ios` / `.fl-scope` define `--ios-card, --ios-ink, --ios-ink-2, --ios-ink-3, --ios-sep,
--ios-edge, --ios-fill, --ios-sel, --ios-btn, --ios-btn-ink, --ios-banner, --ios-ok,
--ios-warn, --ios-accent`. `--ios-ink-3` is for decoration only (contrast 2.3:1); text uses
`--ios-ink-2` or darker. The convert demo keeps its own `--ap-*` layer.

## 5. Components
- **Window** (`.ios`): head (title, count), rows (`.ios-row` > `.ios-main`, `.ios-end`,
  `.ios-status` with a dot), 4 rows in services so the height never jumps.
- **Services** (`.sv-*`): a tab list of areas and one window. On wide screens the window is
  `position: sticky` so picking an item at the bottom never leaves the example off-screen; on
  phones the tabs are a scrolling row and the window follows.
- **Pricing** (`.pc-*`): three open columns separated by hairlines, "desde" before every price,
  `StarBorder` (React Bits) only on the recommended plan's button.
- **Buttons** (`LinkButton`): one compact cell, no hover movement.
- **Back to top**: floating button from `md` up, an arrow inside the phone bar, and a link in
  the footer.
- **Scroll depth** (`ScrollDepth`, poses in `src/lib/depth.ts`): the hero window leans back as
  the page scrolls away; services and pricing rise into place. Scrubbed, transform + opacity.
- **ScrollWords**: the problem lines firm up word by word (CSS view timeline).

## 6. Layout
- `Container` max 1360px; section rhythm 80px on phones, 112 to 160px from `sm`.
- Section head: kicker left, title and lead right from `lg`; stacked on phones. Pricing is
  centred.
- Breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. Phones are recomposed, not shrunk:
  the FAQ contact card goes after the questions, tabs become a row.

## 7. Accessibility checklist
- WCAG 2.2 AA in both themes. Last measured with Lighthouse on the production build:
  accessibility 100 on phone; desktop reported one contrast issue (hero demo timestamp) that was
  fixed after.
- Visible focus on every control; tabs follow the ARIA tabs pattern (arrows, Home, End).
- `prefers-reduced-motion`: no smooth scroll beyond native, no scrub, no word reveal, no loops.
- Decorative SVG and icons are `aria-hidden`.
