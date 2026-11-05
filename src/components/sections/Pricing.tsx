import { Container } from "@/components/ui/Container";
import { ScrollDepth } from "@/components/ui/ScrollDepth";
import { SectionHead } from "@/components/ui/SectionHead";
import { FLAT, RISE } from "@/lib/depth";
import { PricingTable } from "./PricingTable";

export function Pricing() {
  return (
    <section
      id="precos"
      aria-labelledby="precos-title"
      className="night relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          center
          kicker="Preços"
          id="precos-title"
          title={<>Cada projeto é único. Os preços partem daqui.</>}
        >
          Como cada projeto é desenhado para o seu caso, os valores indicados são pontos de partida,
          sem IVA. O valor final depende do que precisa e é apresentado por escrito, na proposta,
          antes de começarmos.
        </SectionHead>

        <div data-reveal className="mt-12 sm:mt-16">
          <ScrollDepth from={RISE} to={FLAT} start="top 98%" end="top 62%">
            <PricingTable />
          </ScrollDepth>
        </div>

        <p className="mx-auto mt-8 max-w-[44rem] text-center text-[13px] leading-[1.6] text-nmute">
          A mensalidade cobre alojamento, cópias de segurança, manutenção, suporte e as horas de
          alterações indicadas em cada plano. Todos os valores são “desde” e dependem do âmbito, do
          número de utilizadores e das ligações a outros programas.
        </p>
      </Container>
    </section>
  );
}
