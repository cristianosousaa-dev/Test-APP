// biome-ignore-all lint/a11y/useValidAnchor: Fragment anchors navigate to real sections and also close the navigation or select the matching demo.
"use client";

import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  FileText,
  Globe2,
  Layers3,
  Menu,
  Package,
  PlugZap,
  X,
} from "lucide-react";
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { selectBriefContext } from "@/lib/brief-context";
import { ThemeSwitch } from "./ThemeSwitch";

const services = [
  {
    id: "software",
    title: "Software à medida",
    text: "Aplicações, plataformas e portais.",
    icon: Layers3,
  },
  {
    id: "automacao",
    title: "Automação e integrações",
    text: "Processos ligados, menos tarefas manuais.",
    icon: PlugZap,
  },
  {
    id: "websites",
    title: "Sites e lojas online",
    text: "Experiências digitais ligadas ao negócio.",
    icon: Globe2,
  },
];
const nav = [
  { href: "#demonstracao", label: "Em ação" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#precos", label: "Preços" },
];

const trackUnderline = (event: ReactPointerEvent<HTMLElement>) => {
  const label = event.currentTarget.querySelector<HTMLElement>(".nav-label");
  if (!label) return;
  const rect = label.getBoundingClientRect();
  label.style.setProperty(
    "--underline-origin",
    `${Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))}%`,
  );
};

export function DynamicHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef<HTMLElement>(null);
  const mobile = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const serviceToggle = useRef<HTMLButtonElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const top = new IntersectionObserver(([entry]) =>
      setScrolled(!(entry?.isIntersecting ?? true)),
    );
    if (sentinel.current) top.observe(sentinel.current);
    const sections = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    for (const item of nav) {
      const el = document.querySelector(item.href);
      if (el) sections.observe(el);
    }
    return () => {
      top.disconnect();
      sections.disconnect();
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
          toggle.current?.focus();
        } else if (servicesOpen) {
          setServicesOpen(false);
          serviceToggle.current?.focus();
        }
      }
      if (!open || event.key !== "Tab") return;
      const elements = [
        toggle.current,
        ...Array.from(mobile.current?.querySelectorAll<HTMLElement>("a,button") ?? []),
      ].filter((el): el is HTMLElement => !!el && el.getClientRects().length > 0);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open, servicesOpen]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobile.current?.querySelector<HTMLElement>("a,button")?.focus();
    const media = window.matchMedia("(min-width: 960px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", close);
    };
  }, [open]);

  const pick = () => {
    setOpen(false);
    setServicesOpen(false);
  };
  const preview = (index: number) => {
    pick();
    window.dispatchEvent(new CustomEvent("orchestr:demo", { detail: index }));
  };
  const hover = (value: boolean) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (value) closeTimer.current = setTimeout(() => setServicesOpen(true), 120);
    else closeTimer.current = setTimeout(() => setServicesOpen(false), 160);
  };

  return (
    <>
      <div ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header
        ref={header}
        className="dynamic-header"
        data-scrolled={scrolled}
        data-menu-open={open}
      >
        <div className="header-shell">
          <div className="nav-row">
            <a href="#top" aria-label="Orchestr — início" className="brand-link">
              <OrchestrLogo id="dynamic-header-logo" />
            </a>
            <nav className="primary-nav" aria-label="Navegação principal">
              {/* biome-ignore lint/a11y/noStaticElementInteractions: hover supplements the keyboard-accessible disclosure button. */}
              <div
                className="services-nav"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
              >
                <button
                  ref={serviceToggle}
                  type="button"
                  className="services-toggle"
                  aria-expanded={servicesOpen}
                  aria-controls="services-dropdown"
                  onPointerMove={trackUnderline}
                  onPointerEnter={trackUnderline}
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  <span className="nav-label">Serviços</span>
                  <ChevronDown size={15} />
                </button>
              </div>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  onPointerMove={trackUnderline}
                  onPointerEnter={trackUnderline}
                >
                  <span className="nav-label">{item.label}</span>
                </a>
              ))}
            </nav>
            <ThemeSwitch />
            <a
              href="#contacto"
              className="nav-cta"
              aria-label="Pedir uma conversa"
              title="Vamos conversar"
              onClick={() => selectBriefContext()}
            >
              <span className="nav-cta-text">Vamos conversar</span>
              <ArrowUpRight size={17} />
            </a>
            <button
              ref={toggle}
              className="nav-mobile-toggle"
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => {
                setOpen(!open);
                setServicesOpen(false);
              }}
            >
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: pointer hover supplements the keyboard-accessible disclosure button. */}
          <div
            id="services-dropdown"
            className="services-dropdown"
            data-open={servicesOpen}
            inert={!servicesOpen}
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
            onBlur={(event) => {
              if (!header.current?.contains(event.relatedTarget)) setServicesOpen(false);
            }}
          >
            <div className="mega-content">
              <div className="mega-heading">
                <span className="eyebrow">TECNOLOGIA À MEDIDA DO SEU NEGÓCIO</span>
                <a href="#servicos" onClick={() => pick()}>
                  Ver todos os serviços
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="mega-services">
                {services.map((service) => (
                  <a key={service.id} href={`#solucao-${service.id}`} onClick={() => pick()}>
                    <service.icon size={24} strokeWidth={1.4} />
                    <strong>{service.title}</strong>
                    <span>{service.text}</span>
                    <ArrowUpRight className="mega-arrow" size={18} />
                  </a>
                ))}
              </div>
              <div className="mega-examples">
                <span>Veja exemplos reais de processos</span>
                {[
                  [Package, "Encomendas"],
                  [FileText, "Faturação"],
                  [CalendarDays, "Marcações"],
                ].map(([Icon, label], i) => {
                  const I = Icon as typeof Package;
                  return (
                    <a href="#demonstracao" key={label as string} onClick={() => preview(i)}>
                      <I size={15} />
                      {label as string}
                      <ArrowUpRight size={13} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <span className="header-progress" aria-hidden="true" />
        </div>
        <div
          ref={mobile}
          id="mobile-navigation"
          className="mobile-navigation"
          data-open={open}
          inert={!open}
          data-lenis-prevent
        >
          <p className="eyebrow">SOFTWARE À MEDIDA. NEGÓCIOS EM SINTONIA.</p>
          <nav aria-label="Navegação móvel">
            <div className="mobile-services">
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="mobile-service-links"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Serviços
                <ChevronDown size={23} />
              </button>
              <div
                id="mobile-service-links"
                className="mobile-service-links"
                data-open={servicesOpen}
                inert={!servicesOpen}
              >
                <div>
                  {services.map((s) => (
                    <a key={s.id} href={`#solucao-${s.id}`} onClick={() => pick()}>
                      {s.title}
                      <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => pick()}>
                {item.label}
                <ArrowUpRight size={23} />
              </a>
            ))}
            <a href="#quem" onClick={() => pick()}>
              Quem constrói
              <ArrowUpRight size={23} />
            </a>
            <a href="#contacto" onClick={() => pick()}>
              <span className="nav-cta-text">Vamos conversar</span>
              <ArrowUpRight size={23} />
            </a>
          </nav>
          <div className="mobile-nav-footer">
            <span>Da primeira ideia à evolução contínua.</span>
            <a href="https://strict-dev.com/" target="_blank" rel="noreferrer">
              Strict.Dev ↗
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
