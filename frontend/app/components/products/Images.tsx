import Image from "next/image";
import React from "react";

interface ImageProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const Images = ({ images }: ImageProps) => {
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  const mainImage = images[0];

  return (
    <div className="flex flex-col gap-8">
      <Image
        src={mainImage.src}
        alt={mainImage.alt}
        width={500}
        height={450}
        className="w-full rounded-lg shadow-lg"
      />

      {images.length > 1 && (
        <div className="flex justify-between gap-2">
          {images.map((image, index) => (
            <Image
              width={200}
              height={150}
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-1/4 rounded-lg cursor-pointer shadow-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Images;
