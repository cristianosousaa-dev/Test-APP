import { HeroStage } from "@/components/hero/HeroStage";
import { Arrow, LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contactHref, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-16">
        <div className="max-w-[36rem]">
          <p className="text-[14px] text-mute">
            Automações à medida para pequenas e médias empresas
          </p>
          <h1 className="mt-5 text-[38px] leading-[1.08] font-medium tracking-[-0.03em] text-ink sm:text-[50px] lg:text-[52px]">
            O seu negócio responde, marca, fatura e cobra.{" "}
            <span className="text-mute">Mesmo quando não está.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-2 sm:text-[18px]">
            Desenhamos automações para o trabalho que se repete todos os dias, ligadas ao WhatsApp,
            ao email, à agenda e ao software de faturação que já usa.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <LinkButton href={contactHref()}>{site.cta}</LinkButton>
            <LinkButton href="#exemplos" variant="text" className="group text-[15px]">
              Ver exemplos
              <Arrow />
            </LinkButton>
          </div>
          <p className="mt-5 text-[13.5px] text-mute">{site.ctaNote}</p>
        </div>
        <HeroStage />
      </Container>
    </section>
  );
}
