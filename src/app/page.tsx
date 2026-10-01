import { BrandDefs } from "@/components/brand/BrandIcon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCta } from "@/components/MobileCta";
import { Benefits } from "@/components/sections/Benefits";
import { Cta } from "@/components/sections/Cta";
import { Difference } from "@/components/sections/Difference";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { PageEffects } from "@/components/ui/PageEffects";

/*
 * Narrative: hero → tools it connects to → problem → how it works (solution) → benefits →
 * services → product in action → difference → process → social proof (only when real) →
 * FAQ → call to action.
 */
export default function Home() {
  return (
    <>
      <BrandDefs />
      <Header />
      <main id="conteudo">
        <Hero />
        <Tools />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Services />
        <Examples />
        <Difference />
        <Process />
        <Proof />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <MobileCta />
      <PageEffects />
    </>
  );
}
