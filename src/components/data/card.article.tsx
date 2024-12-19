import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
  summary: string;
  author?: string;
  date: string;
  rating?: number;
}

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
  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <div className="text-gray-600 text-xs mb-2 flex justify-between items-center">
          <span>{author}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center mb-3">{renderStars(rating)}</div>

        <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-sm text-gray-700 line-clamp-3">{summary}</p>
      </div>
      <div className="px-6 pb-4">
        <button className="text-blue-600 font-medium hover:underline">
          View Post
        </button>
      </div>
    </div>
  );
}
