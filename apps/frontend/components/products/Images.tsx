import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

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

	return (
		<div className="flex flex-col gap-5">
			<Carousel className="w-full">
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index}>
							<Image
								src={image.src}
								alt={image.alt}
								className="w-full max-h-[600px] rounded-md object-cover"
								width={300}
								height={400}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 shadow-md rounded-full" />
				<CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 shadow-md rounded-full" />
			</Carousel>

			{images.length > 1 && (
				<div className="flex gap-2">
					{images.map((image, index) => (
						<Image
							width={100}
							height={80}
							key={index}
							src={image.src}
							alt={image.alt}
							className="w-[100px] h-[80px] rounded-lg cursor-pointer shadow-lg object-cover"
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Images;
