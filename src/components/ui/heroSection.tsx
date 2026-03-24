// heroSection.tsx
import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeHeroSectionBlogSkeleton,
  IContentfulAsset,
} from "@/contentful/types/article.types";
import Link from "next/link";

const getHero = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeHeroSectionBlogSkeleton>(
      {
        content_type: "heroSectionBlog",
      }
    );
    return data.items[0]?.fields || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function HeroSection() {
  const hero = await getHero();

  return (
    hero && (
      <section
        className="relative flex min-h-[85vh] items-center overflow-hidden"
        style={{
          backgroundImage: `url(https:${
            (hero.coverImage as IContentfulAsset).fields.file.url
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-slate-900/25"></div>
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-amber-200/35 blur-3xl"></div>
        <div className="absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl"></div>
        <div className="container relative z-10 mx-auto px-6 py-20 text-white">
          <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Stories & Ideas
              </p>
              <h1
                id="hero-title"
                className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                {hero.tagline}
              </h1>
              <p className="mt-6 text-lg text-white/80">
                Tempat berbagi catatan, ulasan, dan insight praktis seputar
                keseharian, teknologi, dan rasa ingin tahu.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#latest"
                  className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 transition hover:-translate-y-0.5"
                >
                  Lihat Artikel
                </Link>
                <Link
                  href="/category"
                  className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
                >
                  Jelajahi Kategori
                </Link>
              </div>
          </div>
        </div>
      </section>
    )
  );
}
