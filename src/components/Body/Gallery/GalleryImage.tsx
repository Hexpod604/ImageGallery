import Image from "next/image";

export function GalleryImage({ src, alt }) {
  return (
    <Image
      className="object-cover w-full h-full rounded-lg"
      src={src}
      alt={alt}
      width={400}
      height={1200}
    />
  );
}
