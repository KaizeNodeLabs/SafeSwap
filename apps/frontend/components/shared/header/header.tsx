"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ActionButtons } from "./action-buttons";

export default function Header() {
	return (
		<>
			<header className="flex items-center justify-between px-6 py-4 border-b">
				<SidebarTrigger />
				<ActionButtons />
			</header>
		</>
	);
}
