"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSidebar = () => setIsOpen(!isOpen);

	return (
		<SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};

export const Sidebar = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { isOpen } = useSidebar();
	return (
		<div
			ref={ref}
			className={cn(
				"fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300",
				isOpen ? "translate-x-0" : "-translate-x-full",
				className,
			)}
			{...props}
		/>
	);
});
Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"px-4 py-2 border-b flex justify-between items-center",
			className,
		)}
		{...props}
	>
		{props.children}
		<SidebarClose />
	</div>
));
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex-1 overflow-y-auto p-4", className)}
		{...props}
	/>
));
SidebarContent.displayName = "SidebarContent";

export const SidebarTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			ref={ref}
			onClick={toggleSidebar}
			className={cn("p-2", className)}
			{...props}
		>
			<Menu size={30} className="text-black" />
			<span className="sr-only">Toggle Sidebar</span>
		</button>
	);
});
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarClose = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			ref={ref}
			onClick={toggleSidebar}
			className={cn(
				"absolute right-4 top-4 opacity-70 hover:opacity-100",
				className,
			)}
			{...props}
		>
			<X className="h-4 w-4" />
			<span className="sr-only">Close Sidebar</span>
		</button>
	);
});
SidebarClose.displayName = "SidebarClose";

// export { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarClose };
