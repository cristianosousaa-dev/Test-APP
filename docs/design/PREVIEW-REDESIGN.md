# Orchestr — Em sintonia

Preview branch: `preview/orchestr-redesign`. Production branch: `main` (not changed).

## Direction

A full redesign, informed by the spacious typography and chapter-based presentation of
https://www.endurosat.com/space-service/. The orbital sculpture represents people,
processes and technology as interdependent parts of one business. It is original canvas
geometry; no EnduroSat artwork, assets or copy were reused.

The identity retains the Orchestr symbol and wordmark. Charcoal, warm paper, muted silver
and signal blue replace the previous green system. Nohemi is used for display type, Mona
Sans for reading and interface text, and Martian Mono for metadata. Fonts are self-hosted.

## Narrative and behavior

1. A clear service and benefit: software, automations and digital experiences for SMEs.
2. Integrations named as tools, without suggesting they are customers or partners.
3. Three service areas: software, processes, and websites / commerce.
4. An interactive illustrative preview: orders, billing and appointments, with a before / after
   comparison, keyboard tabs, step selection, pause / replay, client search and order details.
5. Business benefits, followed by the four-step delivery process.
6. Existing entry prices, monthly costs and inclusions; no fabricated ROI or testimonials.
7. The real founder and existing links to his work.
8. Shared FAQ data drives both visible questions and JSON-LD.
9. A single closing contact form. `ola@example.com` is retained at the owner's request.
   Example mode prepares a message locally and supports copying it. It does not send a
   request, persist personal data, or pretend an email has been delivered.
10. A privacy page describing the actual preview behavior.

## React Bits

The existing vendored React Bits components are used directly in the new design:
- Magnet: restrained pointer response on the primary hero action.
- SpotlightCard: subtle pointer light across the service panels.

Source: https://reactbits.dev/get-started/index
Official SpotlightCard source reviewed during implementation:
https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/SpotlightCard
Existing upstream notices and license references remain in the vendored files.

## Motion and accessibility

- The global movement control pauses the sculpture, CSS loops and demo playback.
- Reveals always resolve to readable content while paused. Content is visible without JS.
- `prefers-reduced-motion` disables loops and transitions and shows the demo's final state.
- Canvas stops drawing outside the viewport and while the browser tab is hidden.
- Demo playback runs only while visible. Pointer effects are disabled while globally paused.
- The mobile navigation supports Escape, keyboard focus return and focus cycling.
- Native FAQ disclosures, labeled form controls, validation and an explicit local preview state.
- No remote image/model, trackers, new animation dependency or backend was introduced.

## Deployment / security

Deploy the feature branch only to Vercel Preview. Keep per-request rendering in the layout
so the existing nonce-based Content Security Policy can stamp Next's runtime scripts.
Preview deployments are excluded from indexing even when a real site URL is configured.

## Validation

- TypeScript and optimized Next build.
- Browser checks at 320, 390, 768, 1024 and 1440 px without horizontal overflow.
- Interactive demo tabs, keyboard arrows / Home, stages, before / after, search and details.
- Mobile menu, Escape / focus return, form error / success, and reduced motion.
- Axe WCAG A/AA checks and visual review of desktop / mobile layouts.
- Production browser checks for hydration, CSP and interactive behavior before handoff.

Final local results: optimized build successful; seven external Next scripts carry the
request nonce; no browser runtime or CSP errors; all six demo states pass the automated
WCAG 2 A/AA + 2.1 A/AA axe rule set with zero violations. Automated accessibility checks
cover detectable issues and do not replace a full assistive-technology review.
