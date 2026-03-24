import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
  summary: string;
  author?: string;
  date: string;
  rating?: number;
}

const formatDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

// Render stars dynamically based on rating
const renderStars = (rating: number | undefined) => {
  const stars = [];
  const maxStars = 5; // Maximum stars
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <i
        key={i}
        className={`fas fa-star ${
          i <= (rating || 0) ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-hidden="true"
      ></i>
    );
  }
  return stars;
};

export default function CardArticle({
  imageUrl,
  title,
  summary,
  author,
  date,
  rating,
}: CardProps) {
  const formattedDate = formatDate(date);
  const safeRating = rating || 0;

  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"></div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{author || "Editorial Team"}</span>
          <time dateTime={date}>{formattedDate}</time>
        </div>

        <div
          className="mb-3 flex items-center"
          aria-label={`Rating ${safeRating} of 5`}
        >
          {renderStars(safeRating)}
        </div>

        <h2 className="mb-3 text-xl font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600 line-clamp-3">{summary}</p>
      </div>
      <div className="px-6 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition group-hover:text-slate-900">
          Read Article
        </span>
      </div>
    </article>
  );
}
