"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useTranslations } from "@/app/hooks/useTranslations";

export const SearchBar = () => {
	const { t } = useTranslations();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const showSearchBar = searchTerm !== undefined && setSearchTerm !== undefined;

	return (
		<>
			{showSearchBar ? (
				<div className="relative w-full pl-2 max-w-[18.75rem] md:w-[18.75rem]">
					<Input
						type="search"
						placeholder="What are you looking for?"
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
