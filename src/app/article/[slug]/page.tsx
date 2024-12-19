"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import contentfulClient from "@/contentful/contentfulClient";
import RichText from "@/components/global/RicText";

import {
  IContentfulAsset,
  TypeArticleSkeleton,
} from "@/contentful/types/article.types";
import CardArticle from "@/components/data/card.article";
import Link from "next/link";

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
    return data.items[0]?.fields;
  } catch (err) {
    console.error("Error fetching article:", err);
    return null;
  }
};

export default function Article() {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (params?.slug) {
        const articleData = await fetchArticleBySlug(params.slug);
        setArticle(articleData);

        const recommendationData = await fetchRecommendations();
        const filteredRecommendations = recommendationData.filter(
          (item) => item.fields.slug !== params.slug
        );
        setRecommendations(filteredRecommendations);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div className="w-full px-4 py-8">
      {article && (
        <div className="bg-white shadow-lg rounded-lg">

          <div className="relative w-full h-[500px] rounded-t-lg overflow-hidden">
            <Image
              src={`https:${
                (article.image as IContentfulAsset)?.fields.file.url
              }`}
              fill
              className="object-cover"
              alt={article.name || "Article Image"}
            />
          </div>

  
          <div className="p-3 max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
              {article.name}
            </h1>
            <p className="text-gray-600 text-center text-lg mb-8">
              By{" "}
              <span className="font-semibold">
                {article.author || "Unknown Author"}
              </span>
              <span className="mx-2">|</span>
              <span>
                {new Date(article.publishedDate).toLocaleDateString()}
              </span>
              <span className="mx-2">|</span>
              <span>{article.readTime || "N/A"} min read</span>
            </p>

            <div className="text-justify prose max-w-none text-gray-700 mb-8 mx-auto">
              <RichText document={article.body} />
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((item, index) => (
                <Link href={`${item.fields.slug}`} key={index}>
                  <CardArticle
                    key={index}
                    imageUrl={`https:${
                      (item.fields.image as IContentfulAsset).fields.file.url
                    }`}
                    title={item.fields.name}
                    summary={item.fields.summary}
                    date={item.fields.publishedDate || "Unknown Date"}
                    rating={item.fields.rating}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
