import type { MetadataRoute } from "next";
import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeArticleSkeleton,
  TypeCategoryArticleSkeleton,
} from "@/contentful/types/article.types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    { url: `${siteUrl}/category`, lastModified: new Date() },
  ];

  try {
    const [articles, categories] = await Promise.all([
      contentfulClient.getEntries<TypeArticleSkeleton>({
        content_type: "article",
        limit: 1000,
      }),
      contentfulClient.getEntries<TypeCategoryArticleSkeleton>({
        content_type: "categoryArticle",
        limit: 1000,
      }),
    ]);

    const articleRoutes = articles.items
      .filter((item) => item.fields.slug)
      .map((item) => ({
        url: `${siteUrl}/article/${item.fields.slug}`,
        lastModified: item.sys.updatedAt
          ? new Date(item.sys.updatedAt)
          : new Date(),
      }));

    const categoryRoutes = categories.items
      .filter((item) => item.fields.slug)
      .map((item) => ({
        url: `${siteUrl}/category/${item.fields.slug}`,
        lastModified: item.sys.updatedAt
          ? new Date(item.sys.updatedAt)
          : new Date(),
      }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return staticRoutes;
  }
}
