"use client";

import {
  BarChart3,
  Boxes,
  Cable,
  CalendarClock,
  FileCheck2,
  FileText,
  Globe,
  type LucideIcon,
  PackageCheck,
  ReceiptEuro,
  RefreshCw,
  Smartphone,
  UsersRound,
} from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollDepth } from "@/components/ui/ScrollDepth";
import { SectionHead } from "@/components/ui/SectionHead";
import { FLAT, RISE } from "@/lib/depth";
import { proposalHref } from "@/lib/site";

type Tone = "novo" | "producao" | "pendente" | "enviado";
type Row = { main: string; sub: string; end: string; s: Tone; label: string };

export type Service = {
  id: string;
  title: string;
  /** What the application replaces today. */
  replaces: string;
  /** What it does for the reader, in plain words. */
  text: string;
  icon: LucideIcon;
  /** The application window shown on the right: illustrative rows, made-up names. */
  win: { title: string; count: string; rows: readonly Row[] };
  before: string;
  now: string;
};

/* One plain sentence per service, and the screen the team would actually look at. */
export const SERVICES: readonly Service[] = [
  {
    id: "encomendas",
    title: "Encomendas e produção",
    replaces: "folhas de Excel e papéis de obra",
    text: "Veja num só ecrã o que está pedido, o que está em produção e o que falta entregar. Toda a equipa vê o mesmo.",
    icon: PackageCheck,
    win: {
      title: "Encomendas",
      count: "14 em aberto",
      rows: [
        {
          main: "Frio Total",
          sub: "Etiquetas A5, 5 000 un.",
          end: "18 mar",
          s: "producao",
          label: "Em produção",
        },
        {
          main: "Mecânica Rui",
          sub: "Caixas 40×30, 200 un.",
          end: "20 mar",
          s: "pendente",
          label: "Falta material",
        },
        {
          main: "Padaria Ribeiro",
          sub: "Sacos kraft, 1 000 un.",
          end: "21 mar",
          s: "novo",
          label: "Nova",
        },
        {
          main: "Clínica do Parque",
          sub: "Impressos de consulta",
          end: "15 mar",
          s: "enviado",
          label: "Entregue",
        },
      ],
    },
    before: "Cada pessoa tem a sua folha e ninguém sabe o que está atrasado.",
    now: "Um só lugar, com estados e datas, atualizado por quem trabalha.",
  },
  {
    id: "orcamentos",
    title: "Orçamentos",
    replaces: "Word e Excel",
    text: "Faça o orçamento com os seus preços em minutos, envie-o em PDF e saiba quais ainda esperam resposta.",
    icon: FileText,
    win: {
      title: "Orçamentos",
      count: "6 à espera de resposta",
      rows: [
        {
          main: "Climatização Silva",
          sub: "2 instalações + deslocação",
          end: "585,00 €",
          s: "pendente",
          label: "À espera",
        },
        {
          main: "Oficina Norte",
          sub: "Caixas 60×40, 80 un.",
          end: "740,00 €",
          s: "novo",
          label: "Por enviar",
        },
        {
          main: "Clínica do Parque",
          sub: "Impressos de consulta",
          end: "480,00 €",
          s: "enviado",
          label: "Aceite",
        },
        {
          main: "Padaria Ribeiro",
          sub: "Sacos kraft, 1 000 un.",
          end: "265,00 €",
          s: "pendente",
          label: "À espera",
        },
      ],
    },
    before: "O orçamento demora dias e ninguém volta a perguntar ao cliente.",
    now: "Sai em minutos, em PDF, e fica a lista do que ainda falta decidir.",
  },
  {
    id: "faturacao",
    title: "Faturação e cobranças",
    replaces: "lançamentos manuais",
    text: "Liga-se ao Moloni, InvoiceXpress, PHC ou Primavera. Avisa quando uma fatura vence e confere os pagamentos recebidos.",
    icon: ReceiptEuro,
    win: {
      title: "Faturas",
      count: "3 vencidas",
      rows: [
        { main: "FT 2026/118", sub: "Frio Total", end: "312,40 €", s: "enviado", label: "Paga" },
        {
          main: "FT 2026/119",
          sub: "Mecânica Rui",
          end: "1 250,00 €",
          s: "pendente",
          label: "Vence em 3 dias",
        },
        {
          main: "FT 2026/115",
          sub: "Oficina Norte",
          end: "740,00 €",
          s: "pendente",
          label: "Vencida",
        },
        {
          main: "FT 2026/121",
          sub: "Padaria Ribeiro",
          end: "265,00 €",
          s: "producao",
          label: "Emitida",
        },
      ],
    },
    before: "Copiar do pedido para o programa de faturação, e depois perseguir pagamentos.",
    now: "A fatura sai do pedido, e quem não pagou recebe o aviso.",
  },
  {
    id: "marcacoes",
    title: "Marcações e agenda",
    replaces: "agenda de papel e mensagens",
    text: "Uma agenda que toda a equipa vê, com confirmação e lembrete automáticos por email e SMS, para menos faltas.",
    icon: CalendarClock,
    win: {
      title: "Agenda de quinta",
      count: "9 marcações",
      rows: [
        {
          main: "09:00 · Ana Costa",
          sub: "Consulta de revisão",
          end: "30 min",
          s: "enviado",
          label: "Confirmada",
        },
        {
          main: "10:30 · Rui Matos",
          sub: "Primeira consulta",
          end: "45 min",
          s: "pendente",
          label: "Por confirmar",
        },
        {
          main: "11:30 · Marta Reis",
          sub: "Revisão",
          end: "30 min",
          s: "enviado",
          label: "Confirmada",
        },
        {
          main: "14:00 · Livre",
          sub: "Espaço disponível",
          end: "60 min",
          s: "novo",
          label: "Livre",
        },
      ],
    },
    before: "Mensagens soltas, esquecimentos e cadeiras vazias.",
    now: "Cada pessoa recebe a confirmação e o lembrete sem ninguém escrever.",
  },
  {
    id: "area-clientes",
    title: "Área de cliente e fornecedor",
    replaces: "emails e chamadas",
    text: "Os seus clientes consultam pedidos, documentos e estados sozinhos, sem telefonar a perguntar.",
    icon: UsersRound,
    win: {
      title: "Os meus pedidos",
      count: "Frio Total",
      rows: [
        {
          main: "Pedido 0412",
          sub: "Etiquetas A5, 5 000 un.",
          end: "18 mar",
          s: "producao",
          label: "Em produção",
        },
        {
          main: "Pedido 0398",
          sub: "Etiquetas A6, 2 000 un.",
          end: "04 mar",
          s: "enviado",
          label: "Entregue",
        },
        {
          main: "Fatura 2026/118",
          sub: "Documento em PDF",
          end: "312,40 €",
          s: "enviado",
          label: "Paga",
        },
        {
          main: "Orçamento 0087",
          sub: "Novo pedido",
          end: "480,00 €",
          s: "pendente",
          label: "A aguardar",
        },
      ],
    },
    before: "O cliente liga ou escreve para saber como vai o pedido.",
    now: "O cliente entra com o seu acesso e vê o estado, sem incomodar ninguém.",
  },
  {
    id: "stock",
    title: "Stock e armazém",
    replaces: "contagens em folha",
    text: "Entradas e saídas registadas no telemóvel, com aviso quando um artigo está a acabar.",
    icon: Boxes,
    win: {
      title: "Stock",
      count: "2 a acabar",
      rows: [
        {
          main: "Fita-cola 48 mm",
          sub: "Armazém A",
          end: "12 un.",
          s: "pendente",
          label: "A acabar",
        },
        { main: "Caixa 40×30", sub: "Armazém A", end: "340 un.", s: "enviado", label: "Normal" },
        { main: "Papel kraft", sub: "Armazém B", end: "6 rolos", s: "pendente", label: "A acabar" },
        { main: "Etiqueta A5", sub: "Armazém B", end: "9 800 un.", s: "enviado", label: "Normal" },
      ],
    },
    before: "A contagem faz-se a olho e só se descobre a falta quando já é tarde.",
    now: "Cada entrada e saída fica registada, e o aviso chega antes de faltar.",
  },
  {
    id: "aprovacoes",
    title: "Aprovações internas",
    replaces: "pastas e circuitos por email",
    text: "Quem aprova o quê, e quando. Fica tudo registado e arquivado, sem correntes de email.",
    icon: FileCheck2,
    win: {
      title: "Aprovações",
      count: "3 por aprovar",
      rows: [
        {
          main: "Contrato Silva Lda",
          sub: "Para: Marta",
          end: "12 mar",
          s: "pendente",
          label: "Por aprovar",
        },
        {
          main: "Compra de material",
          sub: "Para: Direção",
          end: "11 mar",
          s: "pendente",
          label: "Por aprovar",
        },
        {
          main: "Férias de abril",
          sub: "Para: Marta",
          end: "08 mar",
          s: "enviado",
          label: "Aprovado",
        },
        {
          main: "Orçamento 0087",
          sub: "Para: Direção",
          end: "07 mar",
          s: "enviado",
          label: "Aprovado",
        },
      ],
    },
    before: "A aprovação anda por email e perde-se pelo caminho.",
    now: "Cada pedido tem um responsável, um prazo e um histórico.",
  },
  {
    id: "numeros",
    title: "Indicadores e relatórios",
    replaces: "relatórios feitos no fim do mês",
    text: "Vendas, prazos e custos atualizados todos os dias, sem esperar pelo relatório do fim do mês.",
    icon: BarChart3,
    win: {
      title: "Este mês",
      count: "atualizado hoje",
      rows: [
        {
          main: "Faturado",
          sub: "Até hoje",
          end: "18 420 €",
          s: "enviado",
          label: "+8 % vs. fevereiro",
        },
        {
          main: "Encomendas atrasadas",
          sub: "Passaram do prazo",
          end: "2",
          s: "pendente",
          label: "A ver",
        },
        {
          main: "Por cobrar",
          sub: "Faturas por pagar",
          end: "3 105 €",
          s: "pendente",
          label: "3 faturas",
        },
        {
          main: "Prazo médio de entrega",
          sub: "Últimos 30 dias",
          end: "4,2 dias",
          s: "enviado",
          label: "Dentro do prazo",
        },
      ],
    },
    before: "Só se sabe como correu o mês quando alguém junta os números à mão.",
    now: "Os números certos, todos os dias, no ecrã de quem decide.",
  },
  {
    id: "ligacoes",
    title: "Integração com outros programas",
    replaces: "copiar e colar entre programas",
    text: "A aplicação fala com o PHC, o Primavera e os ficheiros que já usa, para deixar de copiar e colar entre programas.",
    icon: Cable,
    win: {
      title: "Ligações",
      count: "3 ativas",
      rows: [
        { main: "Moloni", sub: "Faturas emitidas", end: "há 2 min", s: "enviado", label: "Ligado" },
        { main: "PHC", sub: "Clientes e artigos", end: "há 6 min", s: "enviado", label: "Ligado" },
        {
          main: "Folha de Excel",
          sub: "Importação inicial",
          end: "feita",
          s: "enviado",
          label: "Concluída",
        },
        { main: "Gmail", sub: "Pedidos por email", end: "—", s: "novo", label: "Por ligar" },
      ],
    },
    before: "Os mesmos dados escritos em dois ou três programas.",
    now: "Escreve-se uma vez, e os outros programas recebem a informação.",
  },
  {
    id: "software-antigo",
    title: "Modernização de software",
    replaces: "programas lentos e ultrapassados",
    text: "Reconstruímos o programa que já não acompanha a empresa, mantendo os seus dados e o que funciona bem.",
    icon: RefreshCw,
    win: {
      title: "Passagem de dados",
      count: "3 de 4 concluídas",
      rows: [
        {
          main: "Clientes",
          sub: "12 480 registos",
          end: "100 %",
          s: "enviado",
          label: "Concluída",
        },
        {
          main: "Artigos",
          sub: "3 210 registos",
          end: "100 %",
          s: "enviado",
          label: "Concluída",
        },
        {
          main: "Faturas",
          sub: "48 900 registos",
          end: "72 %",
          s: "producao",
          label: "Em curso",
        },
        {
          main: "Utilizadores",
          sub: "14 pessoas",
          end: "—",
          s: "pendente",
          label: "Por configurar",
        },
      ],
    },
    before: "O programa é lento, só funciona num computador e já ninguém sabe mexer nele.",
    now: "Os mesmos dados, numa aplicação rápida, no navegador e no telemóvel.",
  },
  {
    id: "site",
    title: "Sites e lojas online",
    replaces: "um site que é só uma montra",
    text: "Um site feito à medida que recebe pedidos, marcações e encomendas e os entrega direto ao seu sistema.",
    icon: Globe,
    win: {
      title: "Pedidos do site",
      count: "5 novos hoje",
      rows: [
        {
          main: "Orçamento",
          sub: "Silva & Filhos · formulário",
          end: "há 4 min",
          s: "novo",
          label: "Novo",
        },
        {
          main: "Marcação",
          sub: "Ana Costa · quinta, 18:00",
          end: "há 22 min",
          s: "enviado",
          label: "Confirmada",
        },
        {
          main: "Encomenda online",
          sub: "Caixas 40×30, 200 un.",
          end: "250,00 €",
          s: "producao",
          label: "Em preparação",
        },
        {
          main: "Pedido de contacto",
          sub: "Oficina Norte",
          end: "há 1 h",
          s: "pendente",
          label: "Por responder",
        },
      ],
    },
    before: "O site é só uma montra, e os pedidos chegam soltos por email.",
    now: "O pedido entra no sistema assim que o cliente o faz, pronto a tratar.",
  },
  {
    id: "terreno",
    title: "Equipas no terreno",
    replaces: "apontamentos em papel e mensagens",
    text: "A equipa regista horas, trabalhos e fotografias no telemóvel, e o escritório vê tudo em tempo real.",
    icon: Smartphone,
    win: {
      title: "Registos de hoje",
      count: "3 equipas",
      rows: [
        {
          main: "Obra Rua Nova",
          sub: "Equipa A · 3 pessoas",
          end: "6 h",
          s: "producao",
          label: "A decorrer",
        },
        {
          main: "Instalação Matosinhos",
          sub: "Equipa B · 2 pessoas",
          end: "4,5 h",
          s: "enviado",
          label: "Concluída",
        },
        {
          main: "Assistência Maia",
          sub: "Equipa C · 1 pessoa",
          end: "1 h",
          s: "enviado",
          label: "Concluída",
        },
        {
          main: "Visita Gondomar",
          sub: "Equipa B · 2 pessoas",
          end: "14:30",
          s: "pendente",
          label: "Agendada",
        },
      ],
    },
    before: "As horas e os trabalhos apontam-se em papel e só chegam ao escritório ao fim do dia.",
    now: "O registo é feito no local, com fotografias, e fica logo no sistema.",
  },
];

export function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0]?.id ?? "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);

  // The header menu can pick an area directly.
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (SERVICES.some((x) => x.id === id)) setActiveId(id);
    };
    window.addEventListener("orchestr:area", on);
    return () => window.removeEventListener("orchestr:area", on);
  }, []);
  const i = Math.max(
    0,
    SERVICES.findIndex((s) => s.id === activeId),
  );
  const active = SERVICES[i];
  if (!active) return null;

  function revealPanel() {
    requestAnimationFrame(() => {
      const r = panel.current?.getBoundingClientRect();
      if (r && (r.top < 90 || r.top > window.innerHeight * 0.55))
        window.scrollTo({ top: window.scrollY + r.top - 100, behavior: "smooth" });
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = SERVICES.length - 1;
    const next = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const s = SERVICES[next];
    if (!s) return;
    setActiveId(s.id);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="O que a Orchestr desenvolve"
          id="servicos-title"
          title={<>Cada solução nasce do seu processo.</>}
        >
          Não revendemos licenças nem adaptamos produtos genéricos. Estudamos o modo como a sua
          equipa trabalha e desenvolvemos apenas o que faz falta. Escolha uma área para ver um
          exemplo.
        </SectionHead>

        <ScrollDepth from={RISE} to={FLAT} start="top 96%" end="top 52%" className="mt-12 sm:mt-16">
          <div data-reveal className="fl-scope sv">
            <div
              role="tablist"
              aria-label="O que quer resolver"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="sv-tabs"
            >
              {SERVICES.map((s, n) => {
                const selected = s.id === active.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabs.current[n] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`sv-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls="sv-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => {
                      setActiveId(s.id);
                      revealPanel();
                    }}
                    className="sv-tab"
                  >
                    <Icon aria-hidden className="size-[18px] shrink-0" strokeWidth={1.6} />
                    <span className="sv-tab-txt">
                      <b>{s.title}</b>
                      <small>Substitui {s.replaces}</small>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              key={active.id}
              ref={panel}
              role="tabpanel"
              id="sv-panel"
              aria-labelledby={`sv-tab-${active.id}`}
              // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs; the panel itself takes focus.
              tabIndex={0}
              className="sv-panel"
            >
              <p className="sv-lead">{active.text}</p>

              <div className="ios">
                <header className="ios-head">
                  <h3 className="ios-title">{active.win.title}</h3>
                  <span className="ios-count">{active.win.count}</span>
                </header>
                <div className="ios-group">
                  {active.win.rows.map((r) => (
                    <div key={r.main} className="ios-row">
                      <div className="ios-main">
                        <b>{r.main}</b>
                        <small>{r.sub}</small>
                      </div>
                      <div className="ios-end">
                        <b>{r.end}</b>
                        <span className="ios-status" data-s={r.s}>
                          <i />
                          {r.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <dl className="sv-diff">
                <div>
                  <dt>Hoje</dt>
                  <dd>{active.before}</dd>
                </div>
                <div>
                  <dt>Com a aplicação</dt>
                  <dd>{active.now}</dd>
                </div>
              </dl>
              <p className="sv-note">Exemplo ilustrativo, com nomes e valores fictícios.</p>
            </div>
          </div>
        </ScrollDepth>

        <div
          data-reveal
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-hair-2 pt-8 sm:flex-row sm:items-center"
        >
          <p className="max-w-[34rem] font-display text-[clamp(20px,2.2vw,28px)] leading-[1.2] tracking-[-0.025em]">
            O seu caso não está na lista? Descreva-o: é quase sempre possível.
          </p>
          <LinkButton href={proposalHref} variant="ink" size="lg" className="shrink-0">
            Descrever o que preciso
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
