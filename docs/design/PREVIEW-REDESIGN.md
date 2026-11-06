# Orchestr — preview refinement

Branch: `preview/orchestr-redesign`. Production branch `main` is not changed.

## Direction confirmed with the owner

Keep the current composition and colour identity. Refine contours, card surfaces,
spacing, typography and motion rather than replacing the approved layout. Target
businesses across sectors, from microbusinesses and SMEs to medium-sized companies.

Retain light/dark mode, the Orchestr symbol in the hero title, the small framed portrait,
the approved service, purpose and process sections, compact pricing, the coloured
marquee in the initial viewport and the Strict.Dev development credit. The portrait
only gains colour on hover. Physical buttons stay still. The middle plan's React Bits
StarBorder remains a 12-second contour with a brightness effect on hover.

## A short conversation form

The first-contact form now has only two required fields: name and email. An optional
message expands smoothly on request. The service is selected by the source button;
pricing links also carry the plan. A compact subject selector lets the visitor change
it without answering a questionnaire. Existing typed contact details are preserved.

The previous multi-step project brief, systems, goal, timing and long suggestions have
been removed. The form is approximately 400 px high on desktop and under 500 px on
verified narrow screens before opening the optional message.

The address deliberately remains `ola@example.com`. This preview prepares a local
summary, with copy and text-file download, and sends no email or server request. The
result keeps its summary collapsed initially. Only the theme preference persists;
contact details stay in page memory.

## Demonstrations of actions

The owner chose miniature applications, automatic playback with pause, selectable steps
and time to read. The hero and all three examples now share the same action engine.
Each stage lasts 7.5 seconds and illustrates an actual sequence:

1. A demonstration cursor moves to the action and a ring marks the click.
2. Fields fill in sequence, with individual completion marks. In a record form the
   fields fill before the cursor confirms the action.
3. A blue packet travels along the source-to-destination connection.
4. A status and confirmation record the result, with several seconds to read it.

Orders move from email to a shared record, then visibly into production, with task
counts updating, and finally to the client's confirmation. Billing reuses the customer
and approved proposal data, prepares a document for human validation and schedules a
reminder. Appointments visibly reserve a calendar slot, confirm it and schedule a reminder.

Amber means pending/manual work, blue means transfer or active work, and green means a
completed action. Text accompanies the colours. The previous text-inspector overlays
have been removed. Before/after remains simultaneous on desktop and stacked on mobile.
All data is illustrative; there are no AI assistant controls or AI icons.

The illustrated application controls are presentation elements. The pause, replay,
step-selection and example tabs are real accessible controls. Manual selection displays
a completed, readable frame and pauses playback. The global pause, hidden-tab and
outside-viewport behavior remain. Reduced motion starts with a final frame and allows
manual exploration without animation.

## Visual finish and scroll

The hero has a quiet network of rounded paths, travelling signals and softly pulsing
nodes. Its movement stops when hidden or outside the viewport. No 3D sculpture or
pointer-following background is introduced.

GSAP and Lenis share the existing animation clock. New scroll-driven sequences draw
a thread through the four project stages, highlight the current stage, reveal the
purpose-section dividers and subtly move the service illustrations. These accompany
normal page scrolling, without a pinned section or navigation trap. FAQ disclosures,
service navigation and smooth anchor links remain.

Card corners, illustrated interfaces, pricing boundaries, buttons and form surfaces
have a more consistent rounded finish. Light mode stays white with subtle blue
backgrounds; dark mode stays charcoal and navy. The headline remains exactly
«Orchestr o futuro da sua empresa.» General copy and metadata now address companies
and emphasise the first conversation.

## Adaptive surface refinement

The shared light/dark palette now uses neutral, low-opacity separators instead of blue
outlines. Navigation, demo panels, fields, pricing and the form share soft depth, quiet
highlights and continuous rounded corners. Subtle glass uses blur with near-opaque
backgrounds; reduced-transparency and unsupported-filter fallbacks use solid surfaces.
Semantic transfer/pending/completed colours remain in the demonstrations.

The service subject is a custom themed combobox/listbox, with pointer, arrow keys,
Home/End, typeahead, Enter, Escape, Tab and outside dismissal. Its menu fits narrow
viewports and opens upwards when space below is limited. Keyboard focus remains visible
with a neutral ring. No new dependency is added.

The project-stage numbers had stretched to roughly 190–215 px on mobile, exposing tall
background strips. They now align to the start at their 25–32 px text height with a
transparent background. The scroll thread runs beside the text, without crossing it.
The demo footer displays an in-progress state until its confirmation appears.

## Verification

TypeScript, the optimized Next build and the changed TS/TSX Biome checks are required.
Browser checks cover actual cursor/packet/field animation, automatic progression,
pause, manual stages, scroll progress, FAQ, keyboard tabs, first-contact validation,
context from service/plan links, preserving contact text, optional message and download.

Responsive checks cover both themes at 320×800, 390×844, 768×900, 1024×800, 1366×768
and 1440×900, including all four hero phases. No horizontal overflow, clipped demo
content or hidden initial marquee is accepted in those formats.

Axe reports zero WCAG A/AA violations in 37 audited states: all 24 desktop demo stages,
the collapsed and expanded form in both themes, the result, four mobile demo states,
and the open custom service menu at desktop/mobile sizes in both themes.
These automated checks do not replace an assistive-technology review.

The per-request CSP nonce, prepaint theme selection, preview noindex setting and existing
production separation remain. No new dependency or external contact service is added.

Final verification: optimized build and TypeScript pass; all changed TS/TSX files pass
Biome. The browser flows, animation timings, scroll progression and responsive matrix
above pass. The combobox keyboard/pointer flows, fixed process label dimensions, popup
viewport bounds, pending demo feedback and reduced-transparency fallback also pass.
The optimized server responds 200 with a CSP nonce; theme persistence,
an actual animated transfer and the complete compact form/download flow work on mobile,
without browser errors or POST requests.
The final optimized-server check also covers both colours of the live animated pricing
button, the menu's upward placement, touch selection and the complete contact flow.
The former hardcoded pricing-button background and radius were removed at their source,
so the animated and paused variants now share the same adaptive material.

## Compact demonstrations and interaction finish

The demonstrations now have one toolbar for the section title and scenario tabs,
one compact explanation row with playback controls, aligned before/after panes,
selectable stages and an inline conversation link. Repeated titles and the separate
closing CTA have been removed. The application data, four stages and action timelines
remain intact. Desktop section height is 586–619 px in the verified 1024–1440 px
widths; the entire section fits below the header at 1280×720. Mobile stacks the panes
and retains readable records rather than forcing a desktop-height presentation.

Header underlines grow from the pointer position and retain a quiet current-section
indicator. Clickable controls use surface, highlight, shadow and underline feedback;
buttons and cards do not translate on hover. Same-page navigation is handled once by
Lenis, with native scroll synchronisation, header clearance and focus at the destination.

## Legal information for this demonstration

Privacy, terms of use, cookies/preferences, legal notice and accessibility have separate
routes, shared navigation, section indexes, update dates and links from the footer.
The owner confirmed that commercial identification is not applicable yet. No operator,
tax number, address, complaints registration or dispute-resolution membership is
invented. The preview notice explains its demonstration status and the example email.

The cookie page documents the actual local storage keys and includes a working theme
reset. No optional tracking tool is installed, so there is no simulated consent banner.
See [LEGAL-PAGES.md](./LEGAL-PAGES.md) for implementation scope and primary references.

The latest browser matrix covers all three examples and four stages in both themes
at 320, 390, 1024, 1280, 1366 and 1440 px, plus all five legal routes on desktop and
mobile. Section fit, content clipping, hover geometry, pointer underline, anchor
alignment, legal indexes, preference reset and sitemap pass. An additional 44 axe
audits report zero violations across the compact demos and legal pages; this is not
an accessibility certification.

The optimized server also passes: nonce-bearing CSP, actual header-to-demo alignment,
visible moving transfer and completion, manual playback, the local contact result,
all five legal routes, live theme reset and the 320 px footer. The exercised flow
produces no browser errors, external application requests or POST requests.
