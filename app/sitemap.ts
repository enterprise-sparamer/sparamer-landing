import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllCases } from "@/lib/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" },
    { path: "/precos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/casos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sobre", priority: 0.7, changeFrequency: "yearly" },
    { path: "/consulta", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contato", priority: 0.8, changeFrequency: "yearly" },
    { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  ];

  const casoRoutes = getAllCases().map((c) => ({
    path: `/casos/${c.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  }));

  return [...routes, ...casoRoutes].map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
