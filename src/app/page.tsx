import { BrandDefs } from "@/components/brand/BrandIcon";
import { ConvertDemo } from "@/components/convert/ConvertDemo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCta } from "@/components/MobileCta";
import { Cta } from "@/components/sections/Cta";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Founder } from "@/components/sections/Founder";
import { Guarantees } from "@/components/sections/Guarantees";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageEffects } from "@/components/ui/PageEffects";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { pageSchema, toJsonLd } from "@/lib/schema";

/*
 * Narrative: the promise (hero) → what it connects to → the reader's problem → the spreadsheet
 * becoming an application (the signature moment) → what gets built → how a project runs →
 * automation as a module → what it costs → what we guarantee → who builds it → questions → describe your process.
 * Night stages and paper sections alternate so the page has rhythm.
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
        <ConvertDemo />
        <Services />
        <Process />
        <Examples />
        <Pricing />
        <Guarantees />
        <Founder />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <MobileCta />
      <BackToTop />
      <PageEffects />
      <SmoothScroll />
    </>
  );
}
