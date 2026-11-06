# Orchestr — preview refinement

Branch: `preview/orchestr-redesign`. Production branch `main` is not changed.

## Direction retained

Charcoal, warm paper and signal blue. The structure of «O que construímos»,
«Tecnologia com um propósito claro» and «Do seu processo ao seu software» is retained,
with larger reading text and GSAP scroll reveals. The original Orchestr symbol and
wordmark remain the basis of the identity.

## Requested refinements

- The hero reads «Orchestr o futuro da sua empresa.» The symbol replaces the initial O.
- The abstract 3D sculpture is removed. A real process preview shows an incoming email,
  an order being registered, production being notified and the client being informed.
- React Bits LogoLoop runs a coloured integration marquee in the initial viewport.
  Actual icons from the existing open-library brand assets are used without grayscale:
  Excel, Outlook, WhatsApp, Shopify, Gmail, Google Calendar, Slack, Stripe and WooCommerce.
- The three examples each show a simultaneous before / after, with a shared animated
  four-stage sequence. Orders, billing and appointments use normal business interfaces,
  without AI icons or chat-assistant UI. All records are illustrative.
- Service dropdown: three service areas and direct links to the three examples.
  The header contracts into a floating bar on scroll and shows reading progress.
- The portrait is reduced to a small framed photograph (200 px desktop, 124 px mobile).
- Pricing is more compact, with four key inclusions and full details on demand.
  The middle plan uses React Bits StarBorder's moving contour. Existing prices remain.
- The contact area is a two-step project brief: service, process and timing, then name,
  company and email. Existing example-contact mode prepares the request locally,
  supports copying / downloading a text file, and sends no data.
- FAQ buttons animate their answer panels open and closed. Closed panels are inert.
- Section indices are plain numbers without square borders.
- The footer credits «Desenvolvido por Strict.Dev» with https://strict-dev.com/.

## Motion

GSAP + ScrollTrigger and Lenis share a ticker for smooth anchor navigation, section
reveals, the initial demo entrance and header progress. Each process preview has its
own GSAP timeline. It pauses outside the viewport and while the tab is hidden.
Manual phase selection, pause and replay are supported. Global pause stops Lenis,
reveals, demo playback, the logo loop and the animated pricing contour. Reduced motion
shows final demo states, avoids Lenis and disables transitions.

Content remains readable while paused. The mobile menu supports Escape and focus return,
with keyboard focus contained while open. Demo tabs support arrow keys, Home and End.

## Security and preview

Keep the layout request-rendered so the existing CSP nonce stamps Next's scripts.
Preview deployments remain excluded from indexing. No production deployment, contact
service, tracker, external model or new dependency is introduced.

## Verification

Validate TypeScript, the optimized Next build, browser interactions, motion / pause,
mobile navigation, the full brief flow, local file download, contrast and responsive
layouts. Check that the coloured marquee fits in the initial viewport, including
1440×900, 1366×768, 390×844 and 320×800.

Final results: optimized build and TypeScript pass; changed TSX files pass Biome.
Browser user flows pass, including actual anchor navigation through Lenis, automatic
phase advancement, global pause, FAQ expansion/collapse, validation, the two-step brief,
text download, mobile navigation and reduced motion. No runtime errors were observed.
The marquee fits the initial viewport in the four formats above without horizontal overflow.
The final production build responds 200, with CSP and nonces on its runtime scripts.
Axe reports zero WCAG A/AA violations in the six audited demo states and contact step two.
Automated checks cover detectable issues and do not replace an assistive-technology review.
