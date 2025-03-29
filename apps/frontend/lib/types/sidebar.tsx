import { LucideIcon } from "lucide-react";

export interface SidebarItem {
	translationKey: string;
	title: string;
	icon: LucideIcon;
	url: string;
}

export type SidebarGroupKeys = "explore" | "seller";
