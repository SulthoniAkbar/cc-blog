import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeAboutBlogSkeleton,
} from "@/contentful/types/article.types";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kenali penulis dan misi di balik catatan perjalanan Sulthoni Akbar.",
};

export default async function AboutPage() {
  let profile = null;

  try {
    const data = await contentfulClient.getEntries<TypeAboutBlogSkeleton>({
      content_type: "aboutBlog",
      limit: 1,
    });

    profile = data.items[0]?.fields || null;
  } catch (err) {
    console.error("Error fetching profile:", err);
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <section className="mb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          About the Blog
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">
          Tentang catatan perjalanan ini.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          {profile?.description || "No description available"}
        </p>
      </section>

      <section className="mb-16">
        <div className="glass mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl p-8 text-center shadow-sm">
          {profile?.image && (
            <Image
              src={`https:${
                (profile.image as IContentfulAsset)?.fields?.file?.url
              }`}
              alt={profile?.name || "Author Name"}
              width={140}
              height={140}
              className="rounded-full border-4 border-white shadow-md"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {profile?.name || "Unknown Author"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {profile?.profileSummary || "No summary available"}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white/80 p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">
            Mission & Vision
          </h3>
          <p className="mt-4 text-sm text-slate-600">
            {profile?.visiMisi || "No mission and vision available"}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-8">
          <h3 className="text-2xl font-semibold text-slate-900">Get in Touch</h3>
          <p className="mt-4 text-sm text-slate-600">
            We would love to hear from you. Kirim pesan, saran, atau ajak
            kolaborasi lewat kanal berikut.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300"
            >
              Instagram
            </a>
            <a
              href="mailto:info@example.com"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
