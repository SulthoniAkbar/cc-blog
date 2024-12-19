"use client";

import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeAboutBlogSkeleton,
} from "@/contentful/types/article.types";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [profile, setProfile] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      const data = await contentfulClient.getEntries<TypeAboutBlogSkeleton>({
        content_type: "aboutBlog",
        limit: 1,
      });

      setProfile(data.items[0]?.fields || null);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <div className="container mx-auto px-6 py-20">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-center mb-8">About This Blog</h1>
        <div className="prose max-w-none text-gray-700 mx-auto text-justify">
          <p>{profile.description || "No description available"}</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Author</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-80">
            <Image
              src={`https:${
                (profile.image as IContentfulAsset)?.fields?.file?.url || ""
              }`}
              alt={profile.name || "Author Name"}
              width={120}
              height={120}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              {profile.name || "Unknown Author"}
            </h3>
            <p className="text-sm text-gray-600 text-justify">
              {profile.summary || "No summary available"}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Mission & Vision
        </h2>
        <div className="prose max-w-none text-gray-700 mx-auto text-justify">
          <p>{profile.visiMisi || "No mission and vision available"}</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            We’d love to hear from you! Whether you have questions, suggestions,
            or simply want to connect, feel free to reach out.
          </p>
          <div className="flex justify-center gap-6 text-gray-700">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              Instagram
            </a>
            <a href="mailto:info@example.com" className="hover:text-blue-600">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
