import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Automações à medida para negócios que querem crescer sem crescer o trabalho repetitivo.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-3 text-[14px]">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-[14px]">
          <a href={`mailto:${site.email}`} className="text-ink-2 transition-colors hover:text-ink">
            {site.email}
          </a>
          <span className="text-muted">Feito em Portugal</span>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-6 text-[12.5px] text-faint sm:px-8">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
