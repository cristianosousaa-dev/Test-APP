import { Container } from "@/components/ui/Container";

/**
 * Social proof slot. Intentionally empty: the page shows no testimonials, client logos or
 * results until they are real and authorised. Renders nothing while TESTIMONIALS is empty.
 * TODO: add real testimonials (with written consent) to show this section.
 */
type Testimonial = { quote: string; name: string; role: string; company: string };

const TESTIMONIALS: Testimonial[] = [];

export function Proof() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section aria-labelledby="prova-title" className="py-24 sm:py-32">
      <Container>
        <h2 id="prova-title" className="kicker text-center">
          O que dizem os clientes
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.name} data-reveal style={{ ["--i" as string]: i }}>
              <figure className="surface h-full p-7">
                <blockquote className="text-[17px] leading-[1.6] text-fg">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-[14px] text-fg-2">
                  <span className="block font-medium text-fg">{t.name}</span>
                  {t.role}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
