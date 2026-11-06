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

## Verification

TypeScript, the optimized Next build and the changed TS/TSX Biome checks are required.
Browser checks cover actual cursor/packet/field animation, automatic progression,
pause, manual stages, scroll progress, FAQ, keyboard tabs, first-contact validation,
context from service/plan links, preserving contact text, optional message and download.

Responsive checks cover both themes at 320×800, 390×844, 768×900, 1024×800, 1366×768
and 1440×900, including all four hero phases. No horizontal overflow, clipped demo
content or hidden initial marquee is accepted in those formats.

Axe reports zero WCAG A/AA violations in 33 audited states: all 24 desktop demo stages,
the collapsed and expanded form in both themes, the result, and four mobile demo states.
These automated checks do not replace an assistive-technology review.

The per-request CSP nonce, prepaint theme selection, preview noindex setting and existing
production separation remain. No new dependency or external contact service is added.

Final verification: optimized build and TypeScript pass; all changed TS/TSX files pass
Biome. The browser flows, animation timings, scroll progression and responsive matrix
above pass. The optimized server responds 200 with a CSP nonce; theme persistence,
an actual animated transfer and the complete compact form/download flow work on mobile,
without browser errors or POST requests.
