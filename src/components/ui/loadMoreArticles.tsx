"use client";

import { useState } from "react";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeArticleSkeleton,
} from "@/contentful/types/article.types";
import CardArticle from "../data/card.article";
import Link from "next/link";

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

type LoadMoreProps = {
  initialSkip: number;
  pageSize: number;
  existingIds: string[];
  initialHasMore: boolean;
};

export default function LoadMoreArticles({
  initialSkip,
  pageSize,
  existingIds,
  initialHasMore,
}: LoadMoreProps) {
  const [items, setItems] = useState<any[]>([]);
  const [skip, setSkip] = useState(initialSkip);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const data = await getArticles(skip, pageSize);
    if (!data) {
      setHasMore(false);
      setIsLoading(false);
      return;
    }

    const nextItems = data.items ?? [];

    const seenIds = new Set([
      ...existingIds,
      ...items.map((item) => item.sys.id),
    ]);
    const filteredItems = nextItems.filter((item) => !seenIds.has(item.sys.id));

    setItems((prev) => [...prev, ...filteredItems]);
    setSkip((prev) => prev + pageSize);
    if (nextItems.length < pageSize) {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  if (!hasMore) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => {
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

      <button
        onClick={loadMore}
        disabled={isLoading}
        className="rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
