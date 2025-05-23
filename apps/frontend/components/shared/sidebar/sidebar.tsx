"use client";

import Link from "next/link";
import { useState } from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	exploreNavItems,
	mainNavItems,
	sellerNavItems,
} from "@/lib/constants/sidebar";
import { SidebarGroupKeys } from "@/lib/types/sidebar";
import { useTranslations } from "next-intl";
import { Logo } from "../logo";
import { CollapsibleSidebarGroup } from "./collapsible-sidebar-group";

export function SafeSwapSidebar() {
	const t = useTranslations();
	const [collapsedGroups, setCollapsedGroups] = useState<
		Record<SidebarGroupKeys, boolean>
	>({
		explore: false,
		seller: false,
	});

	const toggleGroup = (group: SidebarGroupKeys) => {
		setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
	};

	return (
		<Sidebar className="border-r border-border">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href={"/"}>
								<Logo width={150} height={40} />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{/* Main Navigation */}
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{mainNavItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon className="size-4" />
											<span>{t(`sidebar.options.${item.translationKey}`)}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Buyer Section */}
				<CollapsibleSidebarGroup
					title={t("sidebar.options.explore")}
					items={exploreNavItems}
					isCollapsed={collapsedGroups.explore}
					toggle={() => toggleGroup("explore")}
				/>

				{/* Seller Section */}
				<CollapsibleSidebarGroup
					title={t("sidebar.options.seller")}
					items={sellerNavItems}
					isCollapsed={collapsedGroups.seller}
					toggle={() => toggleGroup("seller")}
				/>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
