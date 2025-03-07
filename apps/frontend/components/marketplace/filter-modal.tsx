"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/hooks/useTranslations";
import { Filter } from "lucide-react";
import { useState } from "react";

interface FilterState {
	sortBy: string;
	minPrice: string;
	maxPrice: string;
	dateListed: string;
	deliveryMethod: string;
	condition: string[];
}

const initialFilters: FilterState = {
	sortBy: "",
	minPrice: "",
	maxPrice: "",
	dateListed: "",
	deliveryMethod: "",
	condition: [],
};

export default function FilterModal() {
	const [filters, setFilters] = useState<FilterState>(initialFilters);
	const { t } = useTranslations();

	const toggleCondition = (condition: string) => {
		setFilters((prev: FilterState) => {
			const conditions = prev.condition.includes(condition)
				? prev.condition.filter((c: string) => c !== condition)
				: [...prev.condition, condition];
			return { ...prev, condition: conditions };
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md ">
					<Filter size={18} />
					<span className="font-medium">{t("filters.title")}</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-lg max-w-[700px]:rounded-md">
				<div className="flex justify-between items-center">
					<DialogHeader>
						<DialogTitle>{t("filters.header")}</DialogTitle>
					</DialogHeader>
				</div>

				<Select
					onValueChange={(value) =>
						setFilters((prev) => ({ ...prev, sortBy: value }))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="suggested">
							{t("filters.sortBy.suggested")}
						</SelectItem>
						<SelectItem value="distance">
							{t("filters.sortBy.distance")}
						</SelectItem>
						<SelectItem value="dateListed">
							{t("filters.sortBy.dateListed")}
						</SelectItem>
						<SelectItem value="highPrice">
							{t("filters.sortBy.highPrice")}
						</SelectItem>
						<SelectItem value="lowPrice">
							{t("filters.sortBy.lowPrice")}
						</SelectItem>
					</SelectContent>
				</Select>

				<div className="flex gap-2">
					<Input
						placeholder={t("filters.price.minPrice")}
						value={filters.minPrice}
						onChange={(e) =>
							setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
						}
					/>
					<Input
						placeholder={t("filters.price.maxPrice")}
						value={filters.maxPrice}
						onChange={(e) =>
							setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
						}
					/>
				</div>

				<Select
					onValueChange={(value) =>
						setFilters((prev) => ({ ...prev, dateListed: value }))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Date Listed" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("filters.dateListed.all")}</SelectItem>
						<SelectItem value="last24Hours">
							{t("filters.dateListed.last24Hours")}
						</SelectItem>
						<SelectItem value="last7days">
							{t("filters.dateListed.last7Days")}
						</SelectItem>
						<SelectItem value="last30Days">
							{t("filters.dateListed.last30Days")}
						</SelectItem>
					</SelectContent>
				</Select>

				<Select
					onValueChange={(value) =>
						setFilters((prev) => ({ ...prev, deliveryMethod: value }))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Delivery Method" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">
							{t("filters.deliveryMethod.all")}
						</SelectItem>
						<SelectItem value="localPickup">
							{t("filters.deliveryMethod.localPickUp")}
						</SelectItem>
						<SelectItem value="delivery">
							{t("filters.deliveryMethod.delivery")}
						</SelectItem>
					</SelectContent>
				</Select>

				<div>
					<p className="font-medium">{t("filters.condition")}</p>
					{[
						t("filters.conditions.new"),
						t("filters.conditions.likeNew"),
						t("filters.conditions.good"),
						t("filters.conditions.fair"),
					].map((condition) => (
						<div key={condition} className="flex items-center gap-2">
							<Checkbox
								id={condition}
								checked={filters.condition.includes(condition)}
								onCheckedChange={() => toggleCondition(condition)}
							/>
							<label htmlFor={condition}>{condition}</label>
						</div>
					))}
				</div>

				<div className="flex gap-5 justify-between">
					<Button
						variant="outline"
						onClick={() => setFilters(initialFilters)}
						className="w-full"
					>
						{t("filters.button.reset")}
					</Button>
					<Button className="w-full">{t("filters.button.applyFilters")}</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
