import contentfulClient from "@/contentful/contentfulClient";
import CardArticle from "@/components/data/card.article";
import {
  IContentfulAsset,
  TypeArticleSkeleton,
  TypeCategoryArticleSkeleton,
} from "@/contentful/types/article.types";

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

type Params = Promise<{ slug: string }>;

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;

  const [articles, category] = await Promise.all([
    fetchArticles(),
    fetchCategoryBySlug(slug),
  ]);

  if (!category) {
    return (
      <div className="px-8 py-20">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          Category not found
        </h1>
      </div>
    );
  }

  const filteredArticles = articles.filter((article) =>
    article.fields.category.some((cat) => cat.sys.id === category.sys.id)
  );

  return (
    <div className="px-8 py-20">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Articles in {category.fields.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <CardArticle
            key={article.sys.id}
            imageUrl={`https:${
              (article.fields.image as IContentfulAsset).fields.file.url
            }`}
            title={article.fields.name}
            summary={article.fields.summary}
            date={article.fields.publishedDate}
            rating={article.fields.rating}
          />
        ))}
      </div>
    </div>
  );
}
