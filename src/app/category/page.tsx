import CardCategoryComponent from "@/components/ui/categoriesSection";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeCategoryArticleSkeleton,
} from "@/contentful/types/article.types";
import Link from "next/link";

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
      <h2 className="text-5xl font-bold text-center mb-8">Category</h2>
      <div className="border-b-4 border-gray-600 w-16 mx-auto mb-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {category &&
          category.items?.map((item) => (
            <Link href={`/category/${item.fields.slug}`} key={item.sys.id}>
              <CardCategoryComponent
                imageUrl={`https:${
                  (item.fields.image as IContentfulAsset)?.fields?.file?.url ||
                  ""
                }`}
                title={item.fields.name || "No Title"}
              />
            </Link>
          ))}
      </div>
    </section>
  );
}
