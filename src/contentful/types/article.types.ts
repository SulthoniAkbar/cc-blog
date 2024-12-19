import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface IContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
      filename?: string;
      contentType?: string;
    };
  };
}

export interface TypeArticleFields {
  name: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  body: EntryFieldTypes.RichText;
  publishedDate: EntryFieldTypes.Date;
  rating?: EntryFieldTypes.Integer;
  summary: EntryFieldTypes.Symbol;
  image: EntryFieldTypes.AssetLink;
  category: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
}

export type TypeArticleSkeleton = EntrySkeletonType<
  TypeArticleFields,
  "article"
>;
export type TypeArticle<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export interface TypeCategoryArticleFields {
  name: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  image: EntryFieldTypes.AssetLink;
}

export type TypeCategoryArticleSkeleton = EntrySkeletonType<
  TypeCategoryArticleFields,
  "categoryArticle"
>;
export type TypeCategoryArticle<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeCategoryArticleSkeleton, Modifiers, Locales>;

export interface TypeHeroSectionBlogFields {
  tagline: EntryFieldTypes.Symbol;
  coverImage: EntryFieldTypes.AssetLink;
}

export type TypeHeroSectionBlogSkeleton = EntrySkeletonType<
  TypeHeroSectionBlogFields,
  "heroSectionBlog"
>;
export type TypeHeroSectionBlog<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeHeroSectionBlogSkeleton, Modifiers, Locales>;

export interface TypeAboutBlogFields {
  name: EntryFieldTypes.Symbol;
  image: EntryFieldTypes.AssetLink;
  description?: EntryFieldTypes.Text;
  profileSummary?: EntryFieldTypes.Symbol;
  visiMisi?: EntryFieldTypes.Text;
}

export type TypeAboutBlogSkeleton = EntrySkeletonType<
  TypeAboutBlogFields,
  "aboutBlog"
>;
export type TypeAboutBlog<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeAboutBlogSkeleton, Modifiers, Locales>;
