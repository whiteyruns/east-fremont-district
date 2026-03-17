import { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/airtable-case-studies";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eastfremontdistrict.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getCaseStudies();
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/district`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/activation-frameworks`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/inventory`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/inquire`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/branding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/production`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => {
    let lastModified = now;
    if (cs.date) {
      const parsed = new Date(cs.date);
      if (!isNaN(parsed.getTime())) {
        lastModified = parsed.toISOString();
      }
    }
    return {
      url: `${siteUrl}/case-studies/${cs.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...caseStudyRoutes];
}
