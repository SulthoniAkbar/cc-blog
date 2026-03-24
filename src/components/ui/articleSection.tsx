import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeArticleSkeleton,
} from "@/contentful/types/article.types";
import Link from "next/link";
import CardArticle from "../data/card.article";
import LoadMoreArticles from "./loadMoreArticles";

const getArticles = async (skip: number, limit: number) => {
  try {
    const data = await contentfulClient.getEntries<TypeArticleSkeleton>({
      content_type: "article",
      skip,
      limit,
    });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function ArticleSection() {
  const initialData = await getArticles(0, 6);
  const articles = initialData?.items ?? [];
  const initialIds = articles.map((article) => article.sys.id);
  const initialHasMore = articles.length === 6;

  return (
    <section id="latest" className="container mx-auto px-6 py-16">
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Latest Articles
        </p>
        <h2 className="mt-3 text-4xl font-semibold text-slate-900">
          Cerita terbaru yang layak dibaca.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          Kumpulan tulisan yang membahas perjalanan, ulasan destinasi, dan tips
          praktis agar perjalanan terasa lebih ringan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const slug = article.fields.slug;
          if (!slug) return null;
          const fields = article.fields as any;
          return (
            <Link href={`/article/${slug}`} key={article.sys.id}>
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
      {articles.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-600">
          Belum ada artikel yang dipublikasikan.
        </p>
      )}

      <LoadMoreArticles
        initialSkip={articles.length}
        pageSize={6}
        existingIds={initialIds}
        initialHasMore={initialHasMore}
      />
    </section>
  );
}
