import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/global/NavBar";
import Footer from "@/components/global/footer";

const headingFont = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  ),
  title: {
    default: "Sulthoni Akbar Blog",
    template: "%s | Sulthoni Akbar",
  },
  description:
    "Catatan perjalanan, ulasan, dan panduan praktis untuk menjelajah dengan lebih cerdas dan sederhana.",
  authors: [{ name: "Sulthoni Akbar" }],
  creator: "Sulthoni Akbar",
  publisher: "Sulthoni Akbar",
  keywords: [
    "travel",
    "blog",
    "itinerary",
    "tips",
    "ulasan",
    "Sulthoni Akbar",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sulthoni Akbar Blog",
    description:
      "Catatan perjalanan, ulasan, dan panduan praktis untuk menjelajah dengan lebih cerdas dan sederhana.",
    url: "/",
    siteName: "Sulthoni Akbar Blog",
    type: "website",
  },
  icons: {
    icon: "/vercel.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sulthoni Akbar Blog",
    description:
      "Catatan perjalanan, ulasan, dan panduan praktis untuk menjelajah dengan lebih cerdas dan sederhana.",
  },
  verification: {
    google: "slh2TLv74HGKTRJN4aOnKHD_r-H_JdivUi2ImVyiGRc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5E6GFGL9LC"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5E6GFGL9LC');
          `}
        </Script>
      </head>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
        >
          Skip to content
        </a>
        <NavbarComponent />
        <main id="content" className="pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
