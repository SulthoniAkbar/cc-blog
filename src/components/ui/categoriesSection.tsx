import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
}

export default function CardCategory({ imageUrl, title }: CardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">
          Jelajahi artikel pilihan dalam kategori ini.
        </p>
      </div>
    </div>
  );
}
