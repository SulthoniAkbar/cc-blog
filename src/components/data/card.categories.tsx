import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
  summary: string;
  date: string;
}

export default function CardCategory({
  imageUrl,
  title,
  summary,
  date,
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
        <div className="text-gray-600 text-xs mb-2">
          {new Date(date).toLocaleDateString()}
        </div>
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
