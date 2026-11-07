// biome-ignore-all lint/a11y/useValidAnchor: These links navigate to the contact section and carry the selected service.
"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircleCheck,
  Code2,
  Database,
  Globe2,
  Layers3,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrandDefs } from "@/components/brand/BrandIcon";
import { OrchestrLogo, OrchestrMark } from "@/components/brand/OrchestrLogo";
import { briefServices, selectBriefContext } from "@/lib/brief-context";
import { legalLinks } from "@/lib/legal/config";
import { founder } from "@/lib/site";
import { AnimatedFaq } from "./AnimatedFaq";
import { CompactPricing } from "./CompactPricing";
import { ContactForm } from "./ContactForm";
import { DynamicHeader } from "./DynamicHeader";
import { ExperienceMotion } from "./ExperienceMotion";
import { HeroConnections } from "./HeroConnections";
import { IntegrationMarquee } from "./IntegrationMarquee";
import { HeroPreview, LiveDemo } from "./LiveDemo";
import { SapphireLink } from "./SapphireLink";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="label-index">{index}</span>
      <span>{children}</span>
    </div>
  );
}

function ServiceArt({ type }: { type: number }) {
  return (
    <div className={`service-art art-${type}`} aria-hidden="true">
      {type === 0 ? (
        <>
          <div className="art-app art-app-back">
            <div />
            <span />
            <span />
          </div>
          <div className="art-app">
            <div />
            <span />
            <span />
            <div className="art-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="art-cross">+</span>
        </>
      ) : type === 1 ? (
        <>
          <div className="art-node node-a">
            <Database size={22} />
          </div>
          <div className="art-node node-b">
            <Workflow size={28} />
          </div>
          <div className="art-node node-c">
            <CircleCheck size={22} />
          </div>
          <div className="art-line" />
          <div className="art-pulse" />
        </>
      ) : (
        <>
          <div className="art-browser">
            <div className="browser-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="art-site-title" />
            <div className="art-site-line" />
            <div className="art-site-blocks">
              <span />
              <span />
            </div>
          </div>
          <div className="art-cursor">
            <ArrowUpRight size={28} />
          </div>
        </>
      )}
    </div>
  );
}

export function Landing() {
  const [paused, setPaused] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const topObserver = new IntersectionObserver(([entry]) =>
      setShowTop(!(entry?.isIntersecting ?? true)),
    );
    if (hero.current) topObserver.observe(hero.current);
    return () => {
      topObserver.disconnect();
    };
  }, []);

  return (
    <div className="orchestr-experience" data-motion={paused ? "paused" : "playing"}>
      <BrandDefs />
      <DynamicHeader />
      <ExperienceMotion paused={paused} />
      <main id="conteudo" tabIndex={-1}>
        <section id="top" className="hero-section" ref={hero} aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <HeroConnections paused={paused} />
          <div className="frame hero-layout">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span className="signal-dot" />
                SOFTWARE À MEDIDA PARA EMPRESAS
              </p>
              <h1 id="hero-title" aria-label="Orchestr o futuro da sua empresa.">
                <span className="hero-wordmark" aria-hidden="true">
                  <OrchestrMark id="hero-title-mark" />
                  <span>rchestr</span>
                </span>
                <span>o futuro da</span>
                <span className="hero-second">
                  sua empresa<span className="blue-period">.</span>
                </span>
              </h1>
              <p className="hero-explanation">
                Software e automação para ligar sistemas, simplificar processos e dar clareza à sua
                operação.
              </p>
              <div className="hero-actions">
                <SapphireLink
                  href="#contacto"
                  className="action action-light"
                  onClick={() => selectBriefContext()}
                  paused={paused}
                  iconSize={19}
                >
                  Pedir uma conversa
                </SapphireLink>
                <a href="#demonstracao" className="hero-demo-link">
                  <span>
                    <Play size={12} fill="currentColor" />
                  </span>
                  Ver em ação
                </a>
              </div>
              <p className="hero-assurance">Primeiro vê o que é possível. Depois decide.</p>
            </div>
            <HeroPreview paused={paused} />
          </div>
          <div className="hero-bottom frame">
            <a href="#servicos" className="scroll-cue">
              <ArrowDown size={17} />
              <span>EXPLORE A ORCHESTR</span>
            </a>
            <div className="hero-principles">
              <span>Feito à sua medida</span>
              <i />
              <span>Preço e prazo por escrito</span>
              <i />
              <span>Acompanhamento contínuo</span>
            </div>
            <button
              type="button"
              className="motion-toggle"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
              aria-label={paused ? "Retomar todas as animações" : "Pausar todas as animações"}
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
              <span>{paused ? "Retomar movimento" : "Pausar movimento"}</span>
            </button>
          </div>
        </section>

        <IntegrationMarquee paused={paused} />

        <section
          id="servicos"
          className="solutions-section section-space"
          aria-labelledby="solutions-title"
        >
          <div className="frame">
            <SectionLabel index="01">O QUE CONSTRUÍMOS</SectionLabel>
            <div className="section-heading" data-reveal>
              <h2 id="solutions-title">
                A sua forma de trabalhar.
                <br />
                <span>Uma nova forma de crescer.</span>
              </h2>
              <p>
                Criamos soluções para a dimensão e os processos da sua empresa, com integração nos
                sistemas que já utiliza.
              </p>
            </div>
            <div className="services-grid">
              {[
                {
                  title: "Software que se adapta.",
                  text: "Aplicações e plataformas que acompanham o seu processo, da primeira encomenda ao último relatório.",
                  tags: ["Gestão e operações", "Portais de clientes", "Modernização de software"],
                  icon: Layers3,
                },
                {
                  title: "Processos que avançam.",
                  text: "Os seus programas falam entre si. Os dados chegam ao sítio certo. A sua equipa ganha espaço para o que importa.",
                  tags: ["Automações", "Integrações", "IA aplicada ao processo"],
                  icon: Workflow,
                },
                {
                  title: "Experiências que convertem.",
                  text: "Sites, lojas e áreas digitais que apresentam o seu negócio e transformam visitas em pedidos, ligados à operação.",
                  tags: ["Sites à medida", "Lojas online", "Marcações e pedidos"],
                  icon: Globe2,
                },
              ].map((service, i) => (
                <div
                  id={`solucao-${["software", "automacao", "websites"][i]}`}
                  key={service.title}
                  data-reveal
                >
                  <article className="service-card">
                    <div className="service-card-top">
                      <span className="mono">0{i + 1} /</span>
                      <service.icon size={18} strokeWidth={1.4} />
                    </div>
                    <ServiceArt type={i} />
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <ul>
                      {service.tags.map((tag) => (
                        <li key={tag}>
                          <Plus size={11} />
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contacto"
                      className="service-link"
                      aria-label={`Conversar sobre ${service.title.toLowerCase()}`}
                      onClick={() => selectBriefContext({ service: briefServices[i] })}
                    >
                      Explorar possibilidades
                      <ArrowUpRight size={17} />
                    </a>
                  </article>
                </div>
              ))}
            </div>
            <div className="solutions-note">
              <span>
                <Code2 size={16} />
                Da primeira ideia à evolução contínua.
              </span>
              <p>Um parceiro para desenhar, construir e acompanhar.</p>
            </div>
          </div>
        </section>

        <section
          id="demonstracao"
          className="demo-section section-space"
          aria-labelledby="demo-title"
        >
          <div className="frame">
            <div data-reveal>
              <LiveDemo motionPaused={paused}>
                <SectionLabel index="02">MENOS EXPLICAÇÕES. MAIS DEMONSTRAÇÃO.</SectionLabel>
                <h2 id="demo-title">
                  Veja o trabalho <span>a fluir.</span>
                </h2>
              </LiveDemo>
            </div>
          </div>
        </section>

        <section className="manifesto-section" aria-labelledby="manifesto-title">
          <div className="frame manifesto-layout">
            <div data-reveal>
              <p className="eyebrow">TECNOLOGIA COM UM PROPÓSITO CLARO.</p>
              <h2 id="manifesto-title">
                Libertar tempo.
                <br />
                Dar clareza.
                <br />
                <span>
                  Criar espaço
                  <br />
                  para crescer.
                </span>
              </h2>
            </div>
            <div className="manifesto-details" data-reveal>
              <OrchestrMark className="manifesto-mark" id="manifesto-mark" />
              <p>
                Quando cada pessoa vê o que precisa, cada tarefa tem um caminho e cada sistema
                partilha a informação certa, o negócio ganha outra dinâmica.
              </p>
              <div className="benefit-row">
                <span className="mono">01</span>
                <div>
                  <h3>Uma visão partilhada.</h3>
                  <p>Dados e estados atualizados, acessíveis a quem precisa deles.</p>
                </div>
              </div>
              <div className="benefit-row">
                <span className="mono">02</span>
                <div>
                  <h3>Menos trabalho repetido.</h3>
                  <p>Regras e ligações que evitam voltar a escrever a mesma informação.</p>
                </div>
              </div>
              <div className="benefit-row">
                <span className="mono">03</span>
                <div>
                  <h3>Mais controlo para decidir.</h3>
                  <p>Histórico, responsabilidades e números que fazem sentido.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="processo"
          className="process-section section-space"
          aria-labelledby="process-title"
        >
          <div className="frame process-layout">
            <div className="process-intro" data-reveal>
              <SectionLabel index="03">DO SEU PROCESSO AO SEU SOFTWARE</SectionLabel>
              <h2 id="process-title">
                Primeiro,
                <br />
                perceber.
                <br />
                <span>Depois, construir.</span>
              </h2>
              <p>
                Cada projeto começa com uma análise da sua operação, dos sistemas existentes e dos
                objetivos do negócio.
              </p>
              <a href="#contacto" className="text-link">
                Começar uma conversa
                <ArrowUpRight size={18} />
              </a>
              <div className="process-stamp">
                <ShieldCheck size={21} />
                <span>
                  Âmbito, preço e prazo.
                  <br />
                  <strong>Tudo por escrito, antes de começar.</strong>
                </span>
              </div>
            </div>
            <div className="process-steps">
              <span className="process-travel" aria-hidden="true">
                <span />
              </span>
              {[
                {
                  title: "Ouvimos o seu negócio.",
                  label: "CONVERSA INICIAL · GRATUITA",
                  text: "Mostre-nos o que faz hoje, os programas que usa e o que lhe está a tirar tempo. Não precisa de um documento técnico.",
                  deliverable: "Um problema bem definido.",
                },
                {
                  title: "Tornamos a ideia visível.",
                  label: "DEMONSTRAÇÃO · SEM COMPROMISSO",
                  text: "Exploramos o processo num protótipo. Vê a direção, faz perguntas e percebe o que a solução pode mudar.",
                  deliverable: "Uma demonstração e uma proposta clara.",
                },
                {
                  title: "Construímos consigo.",
                  label: "DESENVOLVIMENTO · ENTREGAS SEMANAIS",
                  text: "Acompanha o trabalho em versões utilizáveis. Testamos com a equipa, afinamos os detalhes e preparamos a transição.",
                  deliverable: "Software pronto para entrar no dia a dia.",
                },
                {
                  title: "Continuamos por perto.",
                  label: "ARRANQUE · ACOMPANHAMENTO CONTÍNUO",
                  text: "Formamos a equipa, acompanhamos o arranque e tratamos da manutenção. A solução evolui com o seu negócio.",
                  deliverable: "Uma relação que continua depois da entrega.",
                },
              ].map((s, i) => (
                <article key={s.title} data-reveal className="process-step">
                  <span className="process-number">0{i + 1}</span>
                  <div>
                    <p className="eyebrow">{s.label}</p>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className="process-deliverable">
                      <Check size={13} />
                      {s.deliverable}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="precos"
          className="pricing-section section-space"
          aria-labelledby="pricing-title"
        >
          <div className="frame">
            <SectionLabel index="04">UM INVESTIMENTO CLARO</SectionLabel>
            <div className="section-heading" data-reveal>
              <h2 id="pricing-title">
                Âmbito definido.
                <br />
                <span>Investimento transparente.</span>
              </h2>
              <p>
                Comece pelo que traz mais valor. Estes são os pontos de partida; a proposta fixa o
                âmbito e o investimento do seu projeto.
              </p>
            </div>
            <CompactPricing paused={paused} />
            <div className="pricing-footnote">
              <p>
                Valores sem IVA. Preços de entrada, sujeitos ao âmbito e às integrações. A
                mensalidade cobre os serviços e as horas indicados em cada plano.
              </p>
              <p>
                Precisa de um site ou loja?{" "}
                <a href="#contacto" onClick={() => selectBriefContext({ service: "Site ou loja" })}>
                  Peça uma proposta à medida <ArrowUpRight size={12} />
                </a>
              </p>
            </div>
            <div className="ownership-row">
              <span>
                <Database size={17} />
                Os seus dados, exportáveis.
              </span>
              <span>
                <ShieldCheck size={17} />
                Acessos por função.
              </span>
              <span>
                <CircleCheck size={17} />
                Condições definidas por escrito.
              </span>
            </div>
          </div>
        </section>

        <section
          id="quem"
          className="founder-section section-space"
          aria-labelledby="founder-title"
        >
          <div className="frame founder-layout">
            <div className="founder-photo" data-reveal>
              <Image
                src={founder.photo}
                alt="Cristiano Sousa, fundador da Orchestr"
                fill
                sizes="(min-width: 700px) 200px, 120px"
              />
            </div>
            <div className="founder-copy" data-reveal>
              <SectionLabel index="05">POR TRÁS DA ORCHESTR</SectionLabel>
              <h2 id="founder-title">
                Uma conversa direta.
                <br />
                <span>Uma pessoa responsável.</span>
              </h2>
              <p className="founder-lead">
                Sou o Cristiano. Vou conhecer o seu processo, construir a solução e continuar por
                perto depois da entrega.
              </p>
              <p>
                Trabalho em desenvolvimento full-stack e engenharia assistida por IA. Na Orchestr,
                junto desenho, desenvolvimento e automação para criar soluções que façam sentido no
                dia a dia de cada empresa.
              </p>
              <div className="founder-signature">
                <div>
                  <strong>Cristiano Sousa</strong>
                  <span>Fundador · Desenvolvimento & automação</span>
                </div>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn de Cristiano Sousa"
                >
                  <span>in</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="founder-projects">
                <span className="eyebrow">TAMBÉM CONSTRUO</span>
                <a href={founder.booklin.url} target="_blank" rel="noreferrer">
                  BOOKLIN
                  <ArrowUpRight size={13} />
                </a>
                <a href={founder.studio.url} target="_blank" rel="noreferrer">
                  Strict.Dev
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section section-space" aria-labelledby="faq-title">
          <div className="frame faq-layout">
            <div data-reveal>
              <SectionLabel index="06">ANTES DE COMEÇAR</SectionLabel>
              <h2 id="faq-title">
                Boas perguntas.
                <br />
                <span>Respostas claras.</span>
              </h2>
              <p>
                O que precisa de saber
                <br />
                para dar o próximo passo.
              </p>
              <a href="#contacto" className="text-link">
                Tenho outra questão
                <ArrowUpRight size={16} />
              </a>
            </div>
            <AnimatedFaq />
          </div>
        </section>

        <section
          id="contacto"
          className="contact-section section-space"
          aria-labelledby="contact-title"
        >
          <div className="frame">
            <SectionLabel index="07">O PRÓXIMO PASSO É UMA CONVERSA</SectionLabel>
            <div className="contact-layout">
              <div className="contact-copy" data-reveal>
                <h2 id="contact-title">
                  Vamos pôr
                  <br />o seu negócio
                  <br />
                  <span>em sintonia.</span>
                  <ArrowUpRight className="contact-big-arrow" strokeWidth={0.7} />
                </h2>
                <p>
                  Partilhe o desafio da sua empresa. Numa primeira conversa, avaliamos o contexto e
                  os próximos passos.
                </p>
                <div className="contact-promises">
                  <span>
                    <Check size={14} />
                    Conversa inicial gratuita
                  </span>
                  <span>
                    <Check size={14} />
                    Demonstração antes de decidir
                  </span>
                  <span>
                    <Check size={14} />
                    Proposta escrita, sem compromisso
                  </span>
                </div>
              </div>
              <div data-reveal>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="frame">
          <div className="footer-top">
            <a href="#top" aria-label="Orchestr — voltar ao início">
              <OrchestrLogo id="footer-logo" className="footer-logo" />
            </a>
            <p>
              Software à medida.
              <br />
              Negócios em sintonia.
            </p>
            <div className="footer-links">
              <a href="#servicos">Soluções</a>
              <a href="#demonstracao">Em ação</a>
              <a href="#quem">Sobre</a>
              <a href="#contacto">Contacto</a>
            </div>
            <a href={founder.linkedin} target="_blank" rel="noreferrer" className="footer-social">
              LinkedIn
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Orchestr</span>
            <span>
              Desenvolvido por{" "}
              <a href="https://strict-dev.com/" target="_blank" rel="noreferrer">
                Strict.Dev ↗
              </a>
            </span>
            <nav className="footer-legal-links" aria-label="Informação legal">
              {legalLinks.map((item) => (
                <a href={`/${item.slug}`} key={item.slug}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
      {showTop && (
        <a href="#top" className="back-top" aria-label="Voltar ao início">
          <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
