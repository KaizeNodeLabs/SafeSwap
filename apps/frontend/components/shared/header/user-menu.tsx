import {
	Globe,
	List,
	Moon,
	Receipt,
	Settings,
	User,
	UserCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { LanguageSelector } from "../sidebar/language-selector";

export const UserMenu = () => {
	const { t } = useTranslations();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span>
					<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<User className="!h-6 !w-6 transition-transform group-hover:scale-110" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuItem>
								<UserCircle className="mr-2 h-4 w-4" />
								<span>{t("common.profile")}</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/my-products" className="flex items-center gap-2">
									<List className="mr-2 h-4 w-4" />
									<span>{t("common.myProducts")}</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Receipt className="mr-2 h-4 w-4" />
								<span>{t("common.transactions")}</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>{t("common.settings")}</span>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem onSelect={(event) => event.preventDefault()}>
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
							</DropdownMenuItem>

							<DropdownMenuItem>
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-2">
										<Globe className="mr-2 h-4 w-4" />
										<span>{t("common.language")}</span>
									</div>
									<LanguageSelector />
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</span>
			</TooltipTrigger>
			{!isOpen && (
				<TooltipContent>
					<p>{t("common.userMenu")}</p>
				</TooltipContent>
			)}
		</Tooltip>
	);
};
