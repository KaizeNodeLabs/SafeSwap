import Image from "next/image";
import * as React from "react";

import { Card, CardContent } from "./card";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel className="w-full max-w-xs">
      <div className="relative">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={320}
                      height={320}
                      priority
                      className="rounded-t-lg h-[320px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
