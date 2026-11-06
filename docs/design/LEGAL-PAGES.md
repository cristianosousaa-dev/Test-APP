# Legal information in the Orchestr preview

Reviewed on 6 November 2026. This document records implementation facts and the
sources used for the legal pages; it is not a certification of legal compliance.

## Current scope

The owner confirmed that commercial identification is not applicable yet. The site
is a demonstration: there is no checkout, subscription, live appointment, invoicing
integration or contact-message endpoint. Demonstrations use fictitious records.
The example email does not receive requests. Website hosting still processes
technical navigation data, which the privacy notice describes.

Five pages are available: `/privacidade`, `/termos`, `/cookies`, `/aviso-legal` and
`/acessibilidade`. Their content is maintained in `src/lib/legal/content.tsx` and
their shared layout in `src/components/legal/LegalDocument.tsx`.

Operator fields in `src/lib/legal/config.ts` remain null. Commercial identification,
an operational contact and applicable consumer-information obligations must be
resolved for the actual activity before commercial activation. No invented legal
entity, NIF, address, complaints registration or RAL affiliation is published.

## Data and preference inventory

- `orchestr-theme`: localStorage, selected light/dark theme, until removed.
- `theme`: legacy localStorage key read for compatibility, removed by reset.
- Contact fields and generated summary: page memory; no application POST or email.
  Copy and download occur only when the visitor requests them. Browser autofill
  and downloaded files are controlled by the visitor's browser/device.
- Demo stages and playback: page memory.
- Hosting: technical request information is processed by Vercel. No retention
  period, exclusive European location or blanket transfer guarantee is invented.
- No optional analytics, advertising pixel or application HTTP cookie is installed.
  Hosting access protection can introduce provider-specific technical mechanisms.

The cookie page's reset removes only the two theme keys, preserves unrelated
storage and restores the system colour scheme. It respects reduced motion.
A future optional tracking integration requires an updated inventory and an actual
prior-consent mechanism before activation.

## Primary references checked

- [RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pt)
- [Lei n.º 58/2019](https://diariodarepublica.pt/dr/detalhe/lei/58-2019-123815982)
- [Decreto-Lei n.º 7/2004, artigo 10.º](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2004-73199154-73197494)
- [Lei n.º 41/2004](https://diariodarepublica.pt/dr/detalhe/lei/41-2004-480710)
- [CNPD — nota informativa sobre cookies](https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf)
- [Vercel privacy notice](https://vercel.com/legal/privacy-notice) and [DPA](https://vercel.com/legal/dpa)
- [Lei n.º 144/2015](https://diariodarepublica.pt/dr/detalhe/lei/144-2015-70215248)
- [Livro de Reclamações](https://www.livroreclamacoes.pt/INICIO/)
- [Resolução de conflitos de consumo — gov.pt](https://www.gov.pt/guias/resolucao-de-conflitos-de-consumo)
- [EU dispute-resolution bodies](https://consumer-redress.ec.europa.eu/dispute-resolution-bodies)
- [Regulation (EU) 2024/3228](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R3228)

The discontinued ODR platform is not presented as an available complaint channel.
Its discontinuation on 20 July 2025 is explained alongside current official resources.

## Verification

All routes, page titles, current navigation states, table/index targets, footer links
and sitemap entries are checked. Responsive checks cover both themes at 320, 390
and 1440 px. Storage reset is checked against unrelated data and the operating-system
theme. Axe checks cover all five pages in both themes on desktop and mobile.
Automated checks do not replace manual assistive-technology review.
