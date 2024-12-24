"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

export function Breadcrumb({ children }: { children: React.ReactNode }) {
	return <nav aria-label="breadcrumb">{children}</nav>;
}

export function BreadcrumbList({ children }: { children: React.ReactNode }) {
	return <ol className="flex space-x-2">{children}</ol>;
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
	return <li className="flex items-center">{children}</li>;
}

export function BreadcrumbSeparator() {
	return (
		<span className="mx-1 text-gray-400">
			<ChevronRight size={16} />
		</span>
	);
}

export default function BreadcrumbNavigation() {
	return (
		<nav aria-label="breadcrumb">
			<ol className="flex items-center space-x-2">
				{/* Home */}
				<BreadcrumbItem>
					<a
						href="/"
						className="text-gray-500 hover:text-gray-700 transition-colors"
					>
						Home
					</a>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{/* Marketplace */}
				<BreadcrumbItem>
					<span className="text-foreground font-medium">Marketplace</span>
				</BreadcrumbItem>
			</ol>
		</nav>
	);
}
