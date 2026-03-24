import CardCategoryComponent from "@/components/ui/categoriesSection";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeCategoryArticleSkeleton,
} from "@/contentful/types/article.types";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Kumpulan kategori artikel perjalanan dan ulasan.",
};

const getCategory = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeCategoryArticleSkeleton>(
      {
        content_type: "categoryArticle",
      }
    );
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function Category() {
  const category = await getCategory();

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Explore Categories
        </p>
        <h2 className="mt-3 text-4xl font-semibold text-slate-900">
          Pilih topik yang paling kamu suka.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          Temukan inspirasi berdasarkan destinasi, jenis perjalanan, atau gaya
          petualangan favoritmu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {category &&
          category.items?.map((item) => {
            const imageUrl = (item.fields.image as IContentfulAsset)?.fields
              ?.file?.url;
            if (!imageUrl || !item.fields.slug) return null;
            return (
              <Link href={`/category/${item.fields.slug}`} key={item.sys.id}>
                <CardCategoryComponent
                  imageUrl={`https:${imageUrl}`}
                  title={item.fields.name || "No Title"}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
}
