"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/useTranslations";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export function SalesHeader() {
	const { t } = useTranslations();
	const [activeFilter, setActiveFilter] = useState("all");

	const getTabKey = (tab: string) => {
		switch (tab) {
			case "all":
				return "all";
			case "pending":
				return "pending";
			case "dispute":
				return "onDispute";
			case "review":
				return "forReview";
			case "approved":
				return "approved";
			default:
				return "";
		}
	};

	const tabs = ["all", "pending", "dispute", "review", "approved"].map(
		(tab) => ({
			value: tab,
			label: t(`Sales.filters.${getTabKey(tab)}`),
		}),
	);

	return (
		<div>
			<div className="flex items-center gap-2 pb-4 sm:mb-0">
				<ShoppingBag className="h-5 w-5" />
				<h1 className="text-lg font-semibold">
					{t("Sales.title") || "My Sales"}
				</h1>
			</div>
			<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
				<div className="flex flex-wrap gap-2">
					{tabs.map((tab) => (
						<Button
							key={tab.value}
							variant={activeFilter === tab.value ? "default" : "outline"}
							onClick={() => setActiveFilter(tab.value)}
							className={`rounded-full text-sm ${
								activeFilter === tab.value
									? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
									: "dark:border-gray-700 dark:text-gray-300"
							}`}
							size="sm"
						>
							{tab.label}
						</Button>
					))}
				</div>
				<Input
					placeholder={t("Sales.searchPlaceholder")}
					className="w-full sm:w-[300px] dark:text-muted dark:border-gray-700 dark:text-gray-300 dark:placeholder-gray-400"
				/>
			</div>
		</div>
	);
}
