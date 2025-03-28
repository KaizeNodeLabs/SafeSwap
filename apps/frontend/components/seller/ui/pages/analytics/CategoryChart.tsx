"use client";

import {
	CategorySales,
	TimeRange,
} from "@/components/seller/mock/sales-analytics.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Cell,
	Pie,
	PieChart,
	TooltipProps as RechartsTooltipProps,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

interface CategoryChartProps {
	data: CategorySales[];
	timeRange: TimeRange;
}

interface LabelProps {
	name: string;
	value: number;
}

export function CategoryChart({ data, timeRange }: CategoryChartProps) {
	const getTitle = () => {
		switch (timeRange) {
			case "Monthly":
				return "Categories This Month";
			case "Quarterly":
				return "Categories This Quarter";
			case "Yearly":
				return "Categories This Year";
			case "All Time":
				return "Categories All Time";
			default:
				return "Categories";
		}
	};

	return (
		<Card className="col-span-2 mt-4 md:mt-0">
			<CardHeader className="mb-4">
				<CardTitle className="text-2xl font-semibold">{getTitle()}</CardTitle>
				<p className="text-sm text-muted-foreground pl-4">
					Sales breakdown by category
				</p>
			</CardHeader>
			<CardContent className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={80}
							label={({ name, value }: LabelProps) => `${name}: ${value}%`}
						>
							{data.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							content={({
								active,
								payload,
							}: RechartsTooltipProps<number, string>) => {
								if (active && payload && payload.length) {
									const data = payload[0].payload as CategorySales;
									return (
										<div className="rounded-lg border bg-background p-2 shadow-sm">
											<div className="grid grid-cols-2 gap-2">
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														Category
													</span>
													<span className="font-bold text-muted-foreground">
														{data.name}
													</span>
												</div>
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														Percentage
													</span>
													<span className="font-bold">{data.value}%</span>
												</div>
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
