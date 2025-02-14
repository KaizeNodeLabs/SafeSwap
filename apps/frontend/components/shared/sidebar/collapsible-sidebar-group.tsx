import { ChevronDown, ChevronRight } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/lib/types/sidebar";

interface CollapsibleSidebarGroupProps {
	title: string;
	items: SidebarItem[];
	isCollapsed: boolean;
	toggle: () => void;
}

export function CollapsibleSidebarGroup({
	title,
	items,
	isCollapsed,
	toggle,
}: CollapsibleSidebarGroupProps) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel
				className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-muted select-none"
				onClick={toggle}
			>
				<span>{title}</span>
				{isCollapsed ? (
					<ChevronRight className="size-4" />
				) : (
					<ChevronDown className="size-4" />
				)}
			</SidebarGroupLabel>
			{!isCollapsed && (
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										<item.icon className="size-4" />
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			)}
		</SidebarGroup>
	);
}
