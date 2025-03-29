import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";

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

export function Testimonials() {
	const t = useTranslations();

	return (
		<section className="py-12 px-4 md:px-8 dark:bg-white/5 bg-black/5">
			<div className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
				<h2 className="text-3xl font-bold mb-8 text-center">
					{t("testimonials.title")}
				</h2>

				<Carousel
					className="w-[calc(100%-64px)] sm:max-w-max touch-pan-y"
					opts={{ loop: true }}
				>
					<CarouselContent>
						{testimonials.map((testimonial) => (
							<CarouselItem key={testimonial.id} className="basis-full">
								<Card className="w-full mx-auto hover:shadow-lg">
									<CardContent className="p-4 sm:p-8 md:p-10">
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
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
}
