import { BrandDefs } from "@/components/brand/BrandIcon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCta } from "@/components/MobileCta";
import { Cta } from "@/components/sections/Cta";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { PageEffects } from "@/components/ui/PageEffects";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { pageSchema, toJsonLd } from "@/lib/schema";

/*
 * Narrative, kept short on purpose: the promise (hero) → tools it connects to → the problem →
 * automations running → what can be automated → what it costs → who builds it and how →
 * social proof (only when real) → FAQ → describe your task (closing).
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own constants, "<" escaped.
        dangerouslySetInnerHTML={{ __html: toJsonLd(pageSchema()) }}
      />
      <BrandDefs />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Tools />
        <Problem />
        <Examples />
        <Services />
        <Pricing />
        <Founder />
        <Proof />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <MobileCta />
      <PageEffects />
      <SmoothScroll />
    </>
  );
}
