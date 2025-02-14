import { Globe, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "@/hooks/useTranslations";
import { LanguageSelector } from "./language-selector";

export function SidebarSettings() {
	const { t } = useTranslations();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2">
									<Moon className="mr-2 h-4 w-4" />
									<span>{t("common.darkMode")}</span>
								</div>
								<Switch
									checked={mounted && theme === "dark"}
									onCheckedChange={(checked) =>
										setTheme(checked ? "dark" : "light")
									}
								/>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2">
									<Globe className="mr-2 h-4 w-4" />
									<span>{t("common.language")}</span>
								</div>
								<LanguageSelector />
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
