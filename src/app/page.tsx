import { BrandDefs } from "@/components/brand/BrandIcon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Cta } from "@/components/sections/Cta";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { PageEffects } from "@/components/ui/PageEffects";

export default function Home() {
  return (
    <>
      <BrandDefs />
      <Header />
      <main id="conteudo">
        <Hero />
        <Tools />
        <HowItWorks />
        <Examples />
        <Services />
        <Process />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <PageEffects />
    </>
  );
}
