import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Category {
	name: string;
	src: string;
	href: string;
}

interface ExploreCategoriesProps {
	categories: Category[];
}

const ExploreCategories: React.FC<ExploreCategoriesProps> = ({
	categories,
}) => {
	return (
		<section className="mt-8">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Explore Categories
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{categories.map((category, index) => (
					<Card key={index} className="p-4 text-center hover:shadow-lg">
						<Link href={category.href} className="block">
							<div className="aspect-square bg-gray-200 flex items-center justify-center rounded-lg mb-2">
								<Image
									src={category.src}
									alt={category.name}
									width={100}
									height={100}
									className="object-cover"
								/>
							</div>
							<p className="font-medium">{category.name}</p>
						</Link>
					</Card>
				))}
			</div>
			<div className="mt-4 text-center">
				<Button asChild variant="outline">
					<Link href="/categories">View All</Link>
				</Button>
			</div>
		</section>
	);
};

export default ExploreCategories;
