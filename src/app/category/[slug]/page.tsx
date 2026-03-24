import contentfulClient from "@/contentful/contentfulClient";
import CardArticle from "@/components/data/card.article";
import {
  IContentfulAsset,
  TypeArticleSkeleton,
  TypeCategoryArticleSkeleton,
} from "@/contentful/types/article.types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const fetchArticles = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeArticleSkeleton>({
      content_type: "article",
    });
    return data.items;
  } catch (err) {
    console.error("Error fetching articles:", err);
    return [];
  }
};

const fetchCategoryBySlug = async (slug: string) => {
  try {
    const data = await contentfulClient.getEntries<TypeCategoryArticleSkeleton>(
      {
        content_type: "categoryArticle",
        "fields.slug": slug,
        limit: 1,
      }
    );
    return data.items[0];
  } catch (err) {
    console.error("Error fetching category:", err);
    return null;
  }
};

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `Category: ${category.fields.name}`,
    description: `Artikel dalam kategori ${category.fields.name}.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = params;

  const [articles, category] = await Promise.all([
    fetchArticles(),
    fetchCategoryBySlug(slug),
  ]);

  if (!category) {
    notFound();
  }

  const filteredArticles = articles.filter((article) =>
    article.fields.category.some((cat) => cat.sys.id === category.sys.id)
  );

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Category
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 capitalize">
          {category.fields.name}
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Artikel pilihan dalam kategori ini.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => {
          const slugValue = article.fields.slug;
          if (!slugValue) return null;
          const fields = article.fields as any;
          return (
            <Link href={`/article/${slugValue}`} key={article.sys.id}>
              <CardArticle
                imageUrl={`https:${
                  (article.fields.image as IContentfulAsset).fields.file.url
                }`}
                title={article.fields.name}
                summary={article.fields.summary}
                author={fields.author}
                date={article.fields.publishedDate || ""}
                rating={article.fields.rating}
              />
            </Link>
          );
        })}
      </div>
      {filteredArticles.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-600">
          Belum ada artikel di kategori ini.
        </p>
      )}
    </div>
  );
}
