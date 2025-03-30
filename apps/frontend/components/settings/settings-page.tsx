"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Moon, SunMedium } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LanguageSelector } from "../shared/sidebar/language-selector";

export default function Settings() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const [notifications, setNotifications] = useState(true);
	const t = useTranslations();

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="flex min-h-screen flex-col bg-background p-4 transition-colors duration-200">
			<div className="w-full space-y-4">
				<Card className="border-border bg-card text-card-foreground shadow-sm">
					<CardHeader className="pb-3">
						<div className="flex items-center gap-2 p-5">
							<SunMedium className="h-7 w-7 text-primary" />
							<CardTitle className="text-xl !p-0">
								{t("settings.aparrence")}
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2 flex gap-3 w-full justify-between">
							<div className="flex flex-col">
								<Label htmlFor="theme" className="text-sm font-bold">
									{t("settings.theme")}
								</Label>
								<p className="text-xs text-muted-foreground">
									{t("settings.themeDescription")}
								</p>
							</div>

							<div className="flex items-center justify-between rounded-lg border p-1">
								<Button
									variant={theme === "light" ? "default" : "ghost"}
									size="sm"
									className="w-full gap-1"
									onClick={() => setTheme("light")}
								>
									<span className="text-sm flex items-center gap-1">
										<SunMedium className="w-3 h-3" />
										{t("settings.light")}
									</span>
								</Button>
								<Button
									variant={theme === "dark" ? "default" : "ghost"}
									size="sm"
									className="w-full gap-1"
									onClick={() => setTheme("dark")}
								>
									<span className="text-sm flex items-center gap-1 dark:text-white">
										<Moon className="w-3 h-3" />
										{t("settings.dark")}
									</span>
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<div className="space-y-2 flex gap-3 w-full justify-between">
								<div className="flex flex-col">
									<Label htmlFor="language" className="text-sm font-bold">
										{t("settings.language")}
									</Label>
									<p className="text-xs text-muted-foreground">
										{t("settings.languageDescription")}
									</p>
								</div>

								<div className="w-full md:w-auto">
									<LanguageSelector />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border bg-card text-card-foreground shadow-sm">
					<CardHeader className="pb-3">
						<div className="flex items-center gap-2 p-5">
							<Bell className="h-5 w-5 text-primary" />
							<CardTitle className="text-xl !p-0">
								{t("settings.notifications")}
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="notifications" className="text-base">
									{t("settings.notificationsLabel")}
								</Label>
								<CardDescription>
									{t("settings.notificationsDescription")}
								</CardDescription>
							</div>
							<Switch
								id="notifications"
								checked={notifications}
								onCheckedChange={setNotifications}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
