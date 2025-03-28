"use client";

import {
	TimeRange,
	mockSalesData,
} from "@/components/seller/mock/sales-analytics.mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryChart } from "./CategoryChart";
import { SalesChart } from "./SalesChart";
import { StatsCards } from "./StatsCards";

export function SalesAnalytics() {
	const timeRanges: TimeRange[] = [
		"Monthly",
		"Quarterly",
		"Yearly",
		"All Time",
	];

	return (
		<Tabs defaultValue="Monthly" className="space-y-4">
			<TabsList>
				{timeRanges.map((range) => (
					<TabsTrigger key={range} value={range}>
						{range}
					</TabsTrigger>
				))}
			</TabsList>
			{timeRanges.map((range) => (
				<TabsContent key={range} value={range} className="space-y-4">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
						<StatsCards data={mockSalesData[range]} />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-10 md:gap-4">
						<div className="md:col-span-5">
							<SalesChart
								data={mockSalesData[range].salesByDay}
								timeRange={range}
							/>
						</div>
						<div className="md:col-span-5">
							<CategoryChart
								data={mockSalesData[range].categorySales}
								timeRange={range}
							/>
						</div>
					</div>
				</TabsContent>
			))}
		</Tabs>
	);
}
