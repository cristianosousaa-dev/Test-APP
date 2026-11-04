import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { allPlans } from "@/lib/site";
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
          title={<>Preço fixo, conhecido antes de começar.</>}
        >
          Valores de entrada, sem IVA. Depois do diagnóstico, a proposta fixa o preço exato, por
          escrito, para saber quanto vai pagar antes de iniciarmos.
        </SectionHead>

        <div data-reveal className="mt-12 sm:mt-16">
          <PricingTable />
        </div>

        <div data-reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="kicker-n">Incluído em todos os planos</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {allPlans.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[14px] text-ntext">
                <Check aria-hidden className="size-4 shrink-0 text-accent-hi" strokeWidth={2} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-8 max-w-[44rem] text-center text-[13px] leading-[1.6] text-nmute">
          A mensalidade cobre alojamento, cópias de segurança, manutenção, suporte e as horas de
          alterações indicadas em cada plano. Os valores das aplicações e plataformas são de
          referência e dependem do âmbito, do número de utilizadores e das integrações.
        </p>
      </Container>
    </section>
  );
}
