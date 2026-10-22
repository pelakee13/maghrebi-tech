import Image from 'next/image';

/** Thumbnail strip of a project's extra screenshots; each opens the full image in a new tab. */
export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length < 2) return null;
  return (
    <ul className="grid grid-cols-4 gap-2">
      {images.map((src, i) => (
        <li key={src}>
          <a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-border">
            <Image
              src={src}
              alt={`${title} (${i + 1}/${images.length})`}
              width={240}
              height={140}
              sizes="(min-width: 1024px) 80px, 20vw"
              className="aspect-[16/10] w-full object-cover transition-opacity hover:opacity-80"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
