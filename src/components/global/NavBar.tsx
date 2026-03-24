
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-slate-900"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-sm font-semibold shadow-sm">
            SA
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200/50 via-white/0 to-sky-200/50 opacity-0 transition group-hover:opacity-100"></span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight group-hover:text-slate-700">
              Sulthoni Akbar
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Stories & Insights
            </span>
          </span>
        </Link>
        <ul className="hidden items-center space-x-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 md:flex">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
          </li>
          <li>
            <Link href="/category" className="hover:text-slate-900">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
          </li>
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/about"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
          >
            Contact
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-800 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-slate-200/60 bg-white/90 shadow-lg backdrop-blur-lg transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-4 px-4 py-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
          </li>
          <li>
            <Link href="/category" className="hover:text-slate-900">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
          </li>
          <li className="pt-2">
            <Link
              href="/about"
              className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
