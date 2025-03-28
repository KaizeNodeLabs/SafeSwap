import { BarChart } from "lucide-react";

export function SalesAnalyticsHeader() {
	return (
		<div className="flex items-center gap-2 sm:mb-0">
			<BarChart className="h-5 w-5" />
			<h1 className="text-lg font-semibold">Sales Overview</h1>
		</div>
	);
}
