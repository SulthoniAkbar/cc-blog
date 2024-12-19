"use client";

import { useState, useEffect } from "react";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeArticleSkeleton,
} from "@/contentful/types/article.types";
import Link from "next/link";
import CardArticle from "../data/card.article";

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

export default function ArticleSection() {
  const [articles, setArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const data = await getArticles(skip, itemsPerPage);

      if (data) {
        setArticles((prev) => [...prev, ...data.items]);
        if (data.items.length < itemsPerPage) {
          setHasMore(false);
        }
      }
    };

    fetchArticles();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <Link href={`article/${article.fields.slug}`} key={idx}>
            <CardArticle
              imageUrl={`https:${
                (article.fields.image as IContentfulAsset).fields.file.url
              }`}
              title={article.fields.name}
              summary={article.fields.summary}
              date={article.fields.publishedDate || "Unknown Date"}
              rating={article.fields.rating}
            />
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
