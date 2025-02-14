"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/useTranslations";

export const SearchBar = () => {
	const { t } = useTranslations();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const showSearchBar = searchTerm !== undefined && setSearchTerm !== undefined;

	return (
		<>
			{showSearchBar ? (
				<div className="relative w-full pl-2">
					<Input
						type="search"
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full h-10 pr-10"
					/>
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-0 top-0 h-full"
					>
						<Search className="!h-5 !w-5" />
						<span className="sr-only">{t("common.search")}</span>
					</Button>
				</div>
			) : null}
		</>
	);
};
