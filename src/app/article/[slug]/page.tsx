import Image from "next/image";
import contentfulClient from "@/contentful/contentfulClient";
import RichText from "@/components/global/RicText";
import {
  IContentfulAsset,
  TypeArticleSkeleton,
} from "@/contentful/types/article.types";
import CardArticle from "@/components/data/card.article";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const fetchRecommendations = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeArticleSkeleton>({
      content_type: "article",
      limit: 6,
    });
    return data.items.sort(
      (a, b) => (b.fields.rating || 0) - (a.fields.rating || 0)
    );
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    return [];
  }
};

const fetchArticleBySlug = async (slug: string) => {
  try {
    const data = await contentfulClient.getEntries<TypeArticleSkeleton>({
      content_type: "article",
      limit: 1,
      "fields.slug": slug,
    });
    return data.items[0] || null;
  } catch (err) {
    console.error("Error fetching article:", err);
    return null;
  }
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const image = article.fields.image as IContentfulAsset;
  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : undefined;

  return {
    title: article.fields.name,
    description: article.fields.summary,
    openGraph: {
      title: article.fields.name,
      description: article.fields.summary,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.fields.name,
      description: article.fields.summary,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function Article({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const fields = article.fields as any;
  const recommendations = (await fetchRecommendations()).filter(
    (item) => item.fields.slug !== slug
  );

  const image = article.fields.image as IContentfulAsset;
  const imageUrl = `https:${image.fields.file.url}`;
  const published = article.fields.publishedDate
    ? new Date(article.fields.publishedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.fields.name,
    description: article.fields.summary,
    image: [imageUrl],
    datePublished: article.fields.publishedDate,
    author: fields.author
      ? {
          "@type": "Person",
          name: fields.author,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Sulthoni Akbar Blog",
    },
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="overflow-hidden rounded-3xl bg-white/90 shadow-xl">
        <div className="relative h-[420px] w-full">
          <Image
            src={imageUrl}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            alt={article.fields.name || "Article Image"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent"></div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-10">
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
            {article.fields.name}
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            {fields.author || "Editorial Team"} · {published} ·{" "}
            {fields.readTime || "N/A"} min read
          </p>

          <div className="prose mt-10 max-w-none text-slate-700">
            <RichText document={article.fields.body} />
          </div>
        </div>
      </article>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Recommended
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            You May Also Like
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item) => {
            const slug = item.fields.slug;
            if (!slug) return null;
            const recFields = item.fields as any;
            return (
              <Link href={`/article/${slug}`} key={item.sys.id}>
                <CardArticle
                  imageUrl={`https:${
                    (item.fields.image as IContentfulAsset).fields.file.url
                  }`}
                  title={item.fields.name}
                  summary={item.fields.summary}
                  author={recFields.author}
                  date={item.fields.publishedDate || ""}
                  rating={item.fields.rating}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
