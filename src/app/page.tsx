import { Backdrop } from "@/components/backdrop/Backdrop";
import { Connector } from "@/components/flow/Connector";
import { Automations } from "@/components/sections/Automations";
import { Closing } from "@/components/sections/Closing";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Nav } from "@/components/sections/Nav";
import { Process } from "@/components/sections/Process";
import { Tools } from "@/components/sections/Tools";
import { PointerLight } from "@/components/ui/PointerLight";

/*
 * One request travels down the page: a client's message arrives, becomes a booking, the
 * work gets done, a proposal goes out, and the next step is yours. The connectors carry it.
 */
export default function Home() {
  return (
    <>
      <Backdrop />
      <PointerLight />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Tools />
        <Manifesto />
        <Connector from={0.3} fromMobile={0.4} label="Nova mensagem · 21:47" icon="message" />
        <Examples />
        <Connector from={0.68} fromMobile={0.6} label="Pedido tratado" icon="check" />
        <Automations />
        <Connector from={0.66} fromMobile={0.55} label="A sua automação" icon="wrench" />
        <Process />
        <Connector from={0.86} fromMobile={0.5} label="Proposta enviada" icon="file" />
        <Faq />
        <Connector from={0.7} fromMobile={0.5} label="Agora é consigo" icon="down" />
        <Closing />
      </main>
    </>
  );
}
