import { FAQS } from "@/components/sections/Faq";
import { founder, pricing, site } from "@/lib/site";

/*
 * One schema.org graph for the page, built from the same constants the page renders, so the
 * markup can never disagree with the visible text. No ratings, reviews or invented contact
 * details: only what is true and shown.
 */
export function pageSchema() {
  const url = site.url.replace(/\/$/, "");
  const offers = pricing.confirmed
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planos",
          itemListElement: (
            [
              ["Uma automação", pricing.single],
              ["Processos ligados", pricing.bundle],
            ] as const
          ).flatMap(([name, p]) => [
            {
              "@type": "Offer",
              name: `${name}: implementação`,
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: p.setup,
                priceCurrency: "EUR",
                valueAddedTaxIncluded: false,
              },
            },
            {
              "@type": "Offer",
              name: `${name}: manutenção mensal`,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: p.monthly,
                priceCurrency: "EUR",
                unitText: "MONTH",
                valueAddedTaxIncluded: false,
              },
            },
          ]),
        },
      }
    : {};

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#site`,
        url: `${url}/`,
        name: site.name,
        inLanguage: "pt-PT",
        publisher: { "@id": `${url}/#org` },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${url}/#org`,
        name: site.name,
        url: `${url}/`,
        logo: `${url}/brand/orchestr-app-icon.svg`,
        description: site.description,
        slogan: site.tagline,
        areaServed: { "@type": "Country", name: "Portugal" },
        knowsLanguage: "pt-PT",
        founder: { "@id": `${url}/#fundador` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#fundador`,
        name: founder.name,
        jobTitle: `Fundador da ${site.name}`,
        image: `${url}${founder.photo}`,
        sameAs: [founder.linkedin, founder.studio.url],
        worksFor: { "@id": `${url}/#org` },
      },
      {
        "@type": "Service",
        "@id": `${url}/#servico`,
        name: "Automação de processos para PME",
        serviceType: "Automação de processos de negócio",
        provider: { "@id": `${url}/#org` },
        areaServed: { "@type": "Country", name: "Portugal" },
        ...offers,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/* Safe to inline in a <script>: escapes "<" so the JSON can never close the tag. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
