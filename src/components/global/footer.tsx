import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white/70">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-sm text-slate-600">
          © {year}. All Rights Reserved.
        </div>

        <div className="text-sm font-semibold text-slate-700">
          by Sulthoni Akbar
        </div>

        <div className="flex space-x-3">
          <a
            href="https://github.com/SulthoniAkbar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-sulthoni-akbar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/muhammadsultoni71/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
