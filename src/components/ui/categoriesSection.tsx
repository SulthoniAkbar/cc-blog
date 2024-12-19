import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
}

export default function CardCategory({ imageUrl, title }: CardProps) {
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
        <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      </div>
    </div>
  );
}
