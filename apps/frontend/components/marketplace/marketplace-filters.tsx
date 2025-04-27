"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

interface FilterParams {
	category?: string;
	priceRange: [number, number];
	condition?: string[];
	sellerRating?: string;
	postedWithin?: string;
	sortBy?: string;
}

interface MarketplaceFiltersProps {
	onFilterChange?: (filters: FilterParams) => void;
}

export default function MarketplaceFilters({
	onFilterChange,
}: MarketplaceFiltersProps) {
	const t = useTranslations();
	const [showFilters, setShowFilters] = useState(true);
	const [activeFilters, setActiveFilters] = useState<string[]>([]);

	const [categoryFilter, setCategoryFilter] = useState<string>("electronics");
	const [priceRange, setPriceRange] = useState<[number, number]>([970, 5000]);
	const [conditionFilter, setConditionFilter] = useState<string[]>(["new"]);
	const [sellerRatingFilter, setSellerRatingFilter] = useState<string>("4");
	const [postedWithinFilter, setPostedWithinFilter] = useState<string>("24h");
	const [sortByFilter, setSortByFilter] = useState<string>("price_low_high");

	const updateActiveFilters = useCallback(() => {
		const newActiveFilters = [];
		if (categoryFilter)
			newActiveFilters.push(
				`Category: ${t(`commonMarketPlaceFilter.categories.${categoryFilter}`)}`,
			);
		if (priceRange[0] > 0 || priceRange[1] < 5000) {
			newActiveFilters.push(`Price: $${priceRange[0]}-$${priceRange[1]}`);
		}
		if (conditionFilter.includes("new")) newActiveFilters.push("New: Yes");
		if (sellerRatingFilter)
			newActiveFilters.push(`Seller Rating: ${sellerRatingFilter}★ & Up`);
		if (postedWithinFilter === "24h")
			newActiveFilters.push("Posted Within: Last 24 Hours");
		if (sortByFilter === "price_low_high")
			newActiveFilters.push("Sort By: Price: Low to High");

		setActiveFilters(newActiveFilters);
	}, [
		categoryFilter,
		conditionFilter,
		priceRange,
		postedWithinFilter,
		sellerRatingFilter,
		sortByFilter,
		t,
	]);

	useEffect(() => {
		updateActiveFilters();
		if (onFilterChange) {
			onFilterChange({
				category: categoryFilter,
				priceRange,
				condition: conditionFilter,
				sellerRating: sellerRatingFilter,
				postedWithin: postedWithinFilter,
				sortBy: sortByFilter,
			});
		}
	}, [
		updateActiveFilters,
		onFilterChange,
		categoryFilter,
		priceRange,
		conditionFilter,
		sellerRatingFilter,
		postedWithinFilter,
		sortByFilter,
	]);

	const toggleFilters = () => {
		setShowFilters(!showFilters);
	};

	const clearAllFilters = () => {
		setCategoryFilter("");
		setPriceRange([0, 5000]);
		setConditionFilter([]);
		setSellerRatingFilter("");
		setPostedWithinFilter("");
		setSortByFilter("");
	};

	// Remove a specific filter
	const removeFilter = (filterType: string) => {
		switch (filterType) {
			case "Category":
				setCategoryFilter("");
				break;
			case "Price":
				setPriceRange([0, 5000]);
				break;
			case "New":
				setConditionFilter(conditionFilter.filter((c) => c !== "new"));
				break;
			case "Seller Rating":
				setSellerRatingFilter("");
				break;
			case "Posted Within":
				setPostedWithinFilter("");
				break;
			case "Sort By":
				setSortByFilter("");
				break;
		}
	};

	return (
		<div className="w-full mb-6">
			<Card className="border border-border p-6 mb-3">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						<h3 className="text-lg font-medium">
							{t("commonMarketPlaceFilter.filters")}
							{activeFilters.length > 0 && (
								<Badge variant="secondary" className="ml-2 py-0">
									{activeFilters.length}
								</Badge>
							)}
						</h3>
					</div>
					<Button
						variant="outline"
						size="sm"
						className="border-secondary hover:border-secondary/80"
						onClick={toggleFilters}
						aria-label={showFilters ? "Hide filters" : "Show filters"}
					>
						{showFilters ? (
							<>
								{t("commonMarketPlaceFilter.hideFilters")}{" "}
								<ChevronUp className="ml-1 h-4 w-4" />
							</>
						) : (
							<>
								{t("commonMarketPlaceFilter.showFilters")}{" "}
								<ChevronDown className="ml-1 h-4 w-4" />
							</>
						)}
					</Button>
				</div>

				{showFilters && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="space-y-2">
							<Label htmlFor="category">
								{t("commonMarketPlaceFilter.category")}
							</Label>
							<Select
								value={categoryFilter}
								onValueChange={(value) => setCategoryFilter(value)}
							>
								<SelectTrigger id="category">
									<SelectValue
										placeholder={t("commonMarketPlaceFilter.selectCategory")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="electronics">
											{t("commonMarketPlaceFilter.categories.electronics")}
										</SelectItem>
										<SelectItem value="clothing">
											{t("commonMarketPlaceFilter.categories.clothing")}
										</SelectItem>
										<SelectItem value="homeAndGarden">
											{t("commonMarketPlaceFilter.categories.homeAndGarden")}
										</SelectItem>
										<SelectItem value="sports">
											{t("commonMarketPlaceFilter.categories.sports")}
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>
								{t("commonMarketPlaceFilter.priceRange", {
									min: priceRange[0],
									max: priceRange[1],
								})}
							</Label>
							<div className="pt-4">
								<Slider
									defaultValue={[priceRange[0], priceRange[1]]}
									max={5000}
									min={0}
									step={10}
									onValueChange={(values) =>
										setPriceRange([values[0], values[1]])
									}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<Label>{t("commonMarketPlaceFilter.condition")}</Label>
							<div className="grid grid-cols-2 gap-2">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="condition-new"
										checked={conditionFilter.includes("new")}
										onCheckedChange={(checked) => {
											if (checked) {
												setConditionFilter([...conditionFilter, "new"]);
											} else {
												setConditionFilter(
													conditionFilter.filter((c) => c !== "new"),
												);
											}
										}}
									/>
									<Label htmlFor="condition-new">
										{t("commonMarketPlaceFilter.conditions.new")}
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="condition-like-new"
										checked={conditionFilter.includes("like-new")}
										onCheckedChange={(checked) => {
											if (checked) {
												setConditionFilter([...conditionFilter, "like-new"]);
											} else {
												setConditionFilter(
													conditionFilter.filter((c) => c !== "like-new"),
												);
											}
										}}
									/>
									<Label htmlFor="condition-like-new">
										{t("commonMarketPlaceFilter.conditions.likeNew")}
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="condition-good"
										checked={conditionFilter.includes("good")}
										onCheckedChange={(checked) => {
											if (checked) {
												setConditionFilter([...conditionFilter, "good"]);
											} else {
												setConditionFilter(
													conditionFilter.filter((c) => c !== "good"),
												);
											}
										}}
									/>
									<Label htmlFor="condition-good">
										{t("commonMarketPlaceFilter.conditions.good")}
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="condition-fair"
										checked={conditionFilter.includes("fair")}
										onCheckedChange={(checked) => {
											if (checked) {
												setConditionFilter([...conditionFilter, "fair"]);
											} else {
												setConditionFilter(
													conditionFilter.filter((c) => c !== "fair"),
												);
											}
										}}
									/>
									<Label htmlFor="condition-fair">
										{t("commonMarketPlaceFilter.conditions.fair")}
									</Label>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label>{t("commonMarketPlaceFilter.sellerRating")}</Label>
							<RadioGroup
								value={sellerRatingFilter}
								onValueChange={setSellerRatingFilter}
								className="grid grid-cols-2 gap-2"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="5" id="rating-5" />
									<Label htmlFor="rating-5">
										<span className="text-yellow-400">★★★★★</span>
										<span className="font-bold">& Up</span>
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="4" id="rating-4" />
									<Label htmlFor="rating-4">
										<span className="text-yellow-400">★★★★</span>
										<span className="text-gray-500">★</span>
										<span className="font-bold">& Up</span>
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="3" id="rating-3" />
									<Label htmlFor="rating-3">
										<span className="text-yellow-400">★★★</span>
										<span className="text-gray-500">★★</span>
										<span className="font-bold">& Up</span>
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="2" id="rating-2" />
									<Label htmlFor="rating-2">
										<span className="text-yellow-400">★★</span>
										<span className="text-gray-500">★★★</span>
										<span className="font-bold">& Up</span>
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="1" id="rating-1" />
									<Label htmlFor="rating-1">
										<span className="text-yellow-400">★</span>
										<span className="text-gray-500">★★★★</span>
										<span className="font-bold">& Up</span>
									</Label>
								</div>
							</RadioGroup>
						</div>

						<div className="space-y-2">
							<Label htmlFor="posted-within">
								{t("commonMarketPlaceFilter.postedWithin")}
							</Label>
							<Select
								value={postedWithinFilter}
								onValueChange={setPostedWithinFilter}
							>
								<SelectTrigger id="posted-within">
									<SelectValue
										placeholder={t("commonMarketPlaceFilter.anyTime")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="any">
										{t("commonMarketPlaceFilter.anyTime")}
									</SelectItem>
									<SelectItem value="24h">
										{t("commonMarketPlaceFilter.last24Hours")}
									</SelectItem>
									<SelectItem value="7d">
										{t("commonMarketPlaceFilter.last7Days")}
									</SelectItem>
									<SelectItem value="30d">
										{t("commonMarketPlaceFilter.last30Days")}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="sort-by">
								{t("commonMarketPlaceFilter.sortBy")}
							</Label>
							<Select value={sortByFilter} onValueChange={setSortByFilter}>
								<SelectTrigger id="sort-by">
									<SelectValue
										placeholder={t("commonMarketPlaceFilter.mostRecent")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="recent">
										{t("commonMarketPlaceFilter.mostRecent")}
									</SelectItem>
									<SelectItem value="price_low_high">
										{t("commonMarketPlaceFilter.priceLowHigh")}
									</SelectItem>
									<SelectItem value="price_high_low">
										{t("commonMarketPlaceFilter.priceHighLow")}
									</SelectItem>
									<SelectItem value="rating">
										{t("commonMarketPlaceFilter.bestRating")}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				)}
			</Card>
			{activeFilters.length > 0 && (
				<div className="mb-4">
					<div className="flex flex-wrap gap-2 items-center">
						<span className="text-sm font-medium">
							{t("commonMarketPlaceFilter.activeFilters")}:
						</span>

						{activeFilters.map((filter, index) => (
							<Badge
								key={index}
								variant="outline"
								className="flex items-center gap-1"
							>
								{filter}
								<X
									className="h-3 w-3 cursor-pointer"
									onClick={() => removeFilter(filter.split(":")[0].trim())}
								/>
							</Badge>
						))}

						<Button
							variant="link"
							size="sm"
							onClick={clearAllFilters}
							className="ml-auto text-sm"
						>
							{t("commonMarketPlaceFilter.clearAll")}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
