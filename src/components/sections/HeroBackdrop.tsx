/** Hero background: one static blue gradient. Nothing animates, so scrolling stays smooth. */
export function HeroBackdrop() {
  return <div aria-hidden className="hero-light-bg pointer-events-none absolute inset-0 -z-10" />;
}
