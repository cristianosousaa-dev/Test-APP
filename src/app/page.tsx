import { BrandDefs } from "@/components/brand/BrandIcon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCta } from "@/components/MobileCta";
import { Cta } from "@/components/sections/Cta";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { PageEffects } from "@/components/ui/PageEffects";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { pageSchema, toJsonLd } from "@/lib/schema";

/*
 * Narrative: describe your task (hero) → tools it connects to → problem → how it works →
 * what can be automated → product in action → what it costs → who builds it → process →
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
        <HowItWorks />
        <Services />
        <Examples />
        <Pricing />
        <Founder />
        <Process />
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
