import { Automations } from "@/components/sections/Automations";
import { Closing } from "@/components/sections/Closing";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Process } from "@/components/sections/Process";
import { Tools } from "@/components/sections/Tools";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Tools />
        <Examples />
        <Automations />
        <Process />
        <Faq />
        <Closing />
      </main>
    </>
  );
}
