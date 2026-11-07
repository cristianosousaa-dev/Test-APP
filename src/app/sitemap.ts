import type { MetadataRoute } from "next";
import { legalLinks } from "@/lib/legal/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...legalLinks.map((item) => ({
      url: `${site.url}/${item.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
