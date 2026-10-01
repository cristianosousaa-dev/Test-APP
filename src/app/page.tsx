import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Capabilities } from "@/components/sections/Capabilities";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { Nav } from "@/components/sections/Nav";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Integrations />
        <BeforeAfter />
        <Examples />
        <Capabilities />
        <Process />
        <Principles />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
