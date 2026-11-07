# Surface and mobile refinement

Follow-up to the approved Safira release, implemented on `preview/surface-refinement`.
The selected palette, optical buttons, pricing, copy, examples and local-only contact
behavior remain in place.

## Surface corrections

The featured plan inherited a two-pixel top border while the pricing grid painted a
second rounded surface underneath it. Replace this nesting with three independent,
equally framed plans separated by 16 px. All plans share one border, radius and
ambient shadow; there is no painted grid frame or clipping of focus outlines.

Remove the legacy `!important` declaration that forced service cards to have square
corners. Use shared responsive radii across panels, windows, inset records and menus,
with a mild continuous-corner enhancement and ordinary rounded-corner fallback.

Demo windows now have one visible border and one diffuse shadow. Remove duplicated
inset contours and strong white highlights. Adapt the manual email, spreadsheet and
agenda to the active theme, including their text and status colours. Align nested
corners, remove the fixed sheet rotation, and keep all real integration colours.
Floating menus, the header, contact panel, portrait and legal panels use the same
restrained surface language.

## Mobile behavior

Touch devices and narrow layouts use native scrolling. Desktop retains Lenis and
GSAP scroll effects. Touch content does not receive scroll-reveal transforms or
hidden visibility; desktop reveals begin at readable opacity instead of hiding
content. A debounced body resize observer updates scroll measurements after content
changes and is cleaned up with its media context.

Hero and comparison mini applications use natural-height records below 960 px.
Before/after panes stack, complete messages remain readable, and the hero exposes
its caption and named steps in two columns. Fields, actions and confirmations remain
inside their windows. Service graphics no longer receive scroll parallax on touch.

The `#contacto` anchor is on the form wrapper, so CTA navigation lands directly on
the form in a phone viewport. The surrounding section uses `#conversa`. Mobile inputs
use 16 px text to avoid focus zoom in iOS. The contact headline has explicit spacing
and a separate final line; the decorative arrow is removed from narrow layouts.

## Verification

TypeScript, scoped TSX Biome checks, CSS formatting and the optimized build pass.
Browser verification covers both themes, twelve touch views at 320, 360, 390, 430,
768 and 820 px, all four hero stages and all twelve comparison stages. It checks
native scroll, content visibility before scrolling, CTA and mobile-menu navigation,
source selection, the full optional-message/contact result, separated pricing cards,
loaded portrait and no page overflow or browser errors.

The final optimized build also checks the form's initial CTA position in six touch
views and verifies single window frames, common card geometry, rounded service
hovers, mobile captions, reduced motion and aligned CTAs across twelve responsive
views (320–1440 px). The prior Safira optical interaction checks and desktop demo
fit at 1280×720 still pass. Four whole-page and 44 demo/legal axe audits report zero
violations. The optimized complete flow checks nonce CSP, header navigation,
animated transfer/completion, the local contact result, five legal routes, preference
reset and the mobile footer without errors, external application requests or POSTs.

## Service artwork and mock edge follow-up

A remaining mobile rule placed each service illustration beside the heading, in a
120 px grid row. The browser graphic extended roughly 31 px beyond that row into
the paragraph. Remove the two-column placement and conflicting height override:
each illustration now reserves its own 176 px row above the heading, clips its
own decorative paint and leaves explicit spacing before the copy. A common minimum
height also accommodates the desktop parallax range on narrower screens.

Replace perspective/3D tilts with restrained 2D rotations and remove forced backface
compositing from the decorative windows. Main demo windows use native round corners
(32 px desktop / 28 px phone, with corresponding 18/16 px inset corners) and a lightly
feathered contour instead of a hard perimeter. No blur filter is applied to content;
text, records and controls remain sharp, and the Safira palette is unchanged.

Verification measures all three illustrations and their individual painted bounds
against the heading and paragraph in 30 theme/width views, including the 700/701 px
breakpoint and widths from 320 to 1440 px. Captures at device pixel ratios 1, 2 and 3
cover both themes. Four whole-page axe audits pass. Optimized-build checks also
exercise unpaused scroll motion and the service-to-contact flow in both themes on
phone and desktop, with no illustration/text overlap, page overflow or browser errors.
