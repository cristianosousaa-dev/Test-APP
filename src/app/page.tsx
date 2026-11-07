import { Landing } from "@/components/experience/Landing";
import { pageSchema, toJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: owned JSON-LD with escaped angle brackets.
        dangerouslySetInnerHTML={{ __html: toJsonLd(pageSchema()) }}
      />
      <Landing />
    </>
  );
}
