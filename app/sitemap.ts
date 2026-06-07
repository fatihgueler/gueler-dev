import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const now = new Date();

  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/leistungen", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projekte", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/ueber", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
