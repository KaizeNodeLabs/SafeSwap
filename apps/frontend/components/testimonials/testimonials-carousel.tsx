import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "@/hooks/useTranslations";

const testimonials = [
	{
		id: 1,
		text: "SafeSwap has revolutionized how I buy and sell online. The escrow system gives me peace of mind.",
		author: "John Doe",
	},
	{
		id: 2,
		text: "I love how easy and secure SafeSwap is! Highly recommended.",
		author: "Jane Smith",
	},
	{
		id: 3,
		text: "Fantastic experience using SafeSwap. Smooth transactions every time.",
		author: "Michael Brown",
	},
];

export default function TestimonialsCarousel() {
	const { t } = useTranslations();

	return (
		<div className="max-w-7xl mx-auto px-4 py-8 text-center relative md:px-6 lg:px-8">
			<h2 className="text-2xl font-semibold mb-6 md:text-3xl lg:text-4xl">
				{t("testimonials.title")}
			</h2>

			<Carousel className="w-full" opts={{ loop: true }}>
				<CarouselContent>
					{testimonials.map((testimonial) => (
						<CarouselItem key={testimonial.id} className="basis-full">
							<Card className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto hover:shadow-lg">
								<CardContent className="p-4 sm:p-5 md:p-6">
									<p className="text-sm sm:text-base md:text-lg italic">
										"{testimonial.text}"
									</p>
									<p className="mt-2 font-semibold text-sm sm:text-base md:text-lg">
										{testimonial.author}
									</p>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 bg-white text-gray-800 border rounded-full p-2 shadow-md z-10 sm:left-2 md:left-4 lg:left-8" />
				<CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 bg-white text-gray-800 border rounded-full p-2 shadow-md z-10 sm:right-2 md:right-4 lg:right-8" />
			</Carousel>
		</div>
	);
}
