"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Globe, Moon, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LanguageSelector } from "../shared/sidebar/language-selector";

export function FloatingSettings() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);
	const t = useTranslations();

	useEffect(() => setMounted(true), []);

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{/* Floating Button */}
			<Button
				variant="outline"
				size="icon"
				className="p-3.5 transition-all rounded-full shadow-lg bg-gradient-to-br from-primary/80 to-primary/60 text-white 
             hover:from-primary hover:to-primary/80 hover:shadow-xl 
             focus:ring-4 focus:ring-primary/40 animate-pulse"
				onClick={() => setOpen(!open)}
			>
				<Settings className="h-6 w-6" />
			</Button>

			{/* Settings Panel */}
			{open && (
				<div className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg w-[205px]">
					{/* Dark Mode Toggle */}
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2">
							<Moon className="h-4 w-4" />
							<span>{t("common.darkMode")}</span>
						</div>
						<Switch
							checked={mounted && theme === "dark"}
							onCheckedChange={(checked) =>
								setTheme(checked ? "dark" : "light")
							}
						/>
					</div>

					{/* Language Selector */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Globe className="h-4 w-4" />
							<span>{t("common.language")}</span>
						</div>
						<LanguageSelector />
					</div>
				</div>
			)}
		</div>
	);
}
