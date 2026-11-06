# Orchestr — preview refinement

Branch: `preview/orchestr-redesign`. Production branch `main` is not changed.

## Visual direction

Charcoal, white and signal blue. Light mode uses solid white surfaces and subtle blue
backgrounds; dark mode uses charcoal and navy throughout, including the form, examples,
pricing and footer. The structure of «O que construímos», «Tecnologia com um propósito
claro» and «Do seu processo ao seu software» is retained. The original Orchestr symbol
replaces the initial O in «Orchestr o futuro da sua empresa.»

The header includes a theme switch. The initial theme follows the system, an explicit
choice persists locally, and the document selects it before rendering. Supported browsers
crossfade theme snapshots; the fallback transitions colours. Reduced motion applies changes
immediately. The bootstrap script uses the existing per-request CSP nonce.

## Interface and motion

- Header dimensions remain stable while background, border and shadow ease into the
  scrolled state. Reading progress, the service dropdown and mobile navigation remain.
- The small framed portrait gains colour on hover without moving or scaling.
- Buttons stay in position; hover effects change their colour, border or light.
- React Bits StarBorder runs the middle plan contour over 12 seconds. Hover brightens
  the effect without speeding it up. Pricing remains compact with expandable inclusions.
- React Bits LogoLoop uses actual coloured brand icons in a more compact marquee.
  It remains visible in the first viewport at the verified desktop, tablet and mobile sizes.
- GSAP + ScrollTrigger and Lenis handle reveals, progress and smooth anchor navigation.
  The global pause stops animated playback, the logo loop and the pricing contour.
- FAQ disclosures animate open and closed; closed answers are inert. The mobile menu
  supports Escape, focus return and focus containment.
- The footer credits «Desenvolvido por Strict.Dev» and links to https://strict-dev.com/.

## Process previews

The hero shows an email turning into an order, a production task and a client confirmation.
The three full examples compare orders, billing and appointments before and after.
Each of the four stages now lasts six seconds, with a written explanation, a source and
destination, concrete record fields and, where relevant, the actual confirmation message.
All records are illustrative. The interfaces contain no AI assistant controls or AI icons.

Each preview pauses outside the viewport and while the tab is hidden. Manual phase selection,
pause and replay remain available. Reduced motion starts at the completed state and allows
manual exploration. The miniature hero is concise; the larger comparison provides detail.

## Lower-friction brief

The first step suggests a project type, current tools, objective, editable description and
an unspecified start date. Suggestions change with the service or project type. Each service
keeps its own draft, and changing the type preserves a description the visitor has edited.
Pricing links select the matching service and plan; the platform plan selects a client portal.

The contact step asks for name and email; company is optional. Personal fields remain blank.
The example address stays `ola@example.com`, as requested. The preview prepares a local
summary with copy and text-file download, and sends no request or email. Only the theme
preference is persisted; the brief stays in memory.

## Verification

TypeScript, the optimized Next build and Biome on the changed TS/TSX files pass.
Browser checks cover theme selection and reload persistence, stable header and hover
geometry, prefilled fields, preserving edits, plan selection, optional company, text download,
mobile menu, six-second stages, pause, FAQ and reduced motion.

Both themes were checked at 320×800, 390×844, 768×900, 1024×800, 1366×768 and 1440×900:
no horizontal page overflow and the complete marquee visible in the initial viewport,
including all four hero phases. All twelve detailed mobile demo stages fit their panels.
Axe reports zero WCAG A/AA violations across twelve desktop demo states, both contact
step-two themes and both mobile themes. These checks cover detectable issues, not a full
assistive-technology review.

Preview deployments remain excluded from indexing. No production deployment, contact
service, tracker, external model or new dependency is introduced.
