import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: automação de processos para PME`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Share card: brand, promise and the blue of the hero. No invented numbers or logos. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(70% 90% at 82% 30%, rgba(43,91,255,0.22), transparent 70%), linear-gradient(180deg, #ffffff 0%, #e2eafd 100%)",
        color: "#0a0c10",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 600 }}
      >
        <div style={{ width: 22, height: 22, background: "#2b5bff" }} />
        {site.name.toLowerCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
          Automatizamos o trabalho repetitivo da sua empresa.
        </div>
        <div style={{ fontSize: 30, color: "#3a414b" }}>
          Atendimento, orçamentos, faturação e cobranças. Preço fixo.
        </div>
      </div>
    </div>,
    size,
  );
}
