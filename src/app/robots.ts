import type { MetadataRoute } from "next";
import { isLive, site } from "@/lib/site";

/*
 * Live: open to search engines and to AI answer engines (so the service can be cited).
 * Preview (placeholder domain): closed to everyone.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isLive) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
