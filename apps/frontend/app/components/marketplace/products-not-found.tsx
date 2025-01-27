import React, { Dispatch, SetStateAction } from "react";

import { PackageSearch } from "lucide-react";
import { Button } from "../ui/button";

type ProductsNotFoundProps = {
	setPriceRange: Dispatch<SetStateAction<[number, number]>>;
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

export default function ProductsNotFound({
	setPriceRange,
	setSelectedCategories,
}: ProductsNotFoundProps) {
	const clearFilters = () => {
		setPriceRange([0, 1500]);
		setSelectedCategories([]);
	};

	return (
		<section className="flex flex-col items-center justify-center space-y-4 mx-auto">
			<PackageSearch className="text-[#9ea1ac] w-12 h-12" />
			<h2 className="font-bold text-2xl">No products found</h2>
			<p>
				We couldn&apos;t find any products matching your current filters. Try
				adjusting your search or filters.
			</p>
			<Button onClick={clearFilters}>Clear all filters</Button>
		</section>
	);
}
