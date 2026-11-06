import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: software à medida para PME`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Share card: brand, promise and the night blue of the hero. No invented numbers or logos. */
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
          "radial-gradient(60% 70% at 85% 75%, rgba(84,118,255,0.18), transparent 70%), #0c0e11",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 600 }}
      >
        <div style={{ width: 22, height: 22, background: "#5476ff" }} />
        {site.name.toLowerCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
          O seu negócio. Em sintonia.
        </div>
        <div style={{ fontSize: 30, color: "#98a5be" }}>
          Software, automação e experiências digitais.
        </div>
      </div>
    </div>,
    size,
  );
}
