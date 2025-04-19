"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	CategorySales,
	TimeRange,
} from "@/lib/mocks/seller/sales-analytics.mock";
import { useTranslations } from "next-intl";
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
	const t = useTranslations();
	const getTitle = () => {
		return (
			t(`Sales.analytics.categoryChart.title.${timeRange}`) ||
			t("Sales.analytics.categoryChart.title.default")
		);
	};

	return (
		<Card className="col-span-2 mt-4 md:mt-0">
			<CardHeader className="mb-4">
				<CardTitle className="text-2xl font-semibold">{getTitle()}</CardTitle>
				<p className="text-sm text-muted-foreground pl-4">
					{t("Sales.analytics.categoryChart.subtitle")}
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
														{t(
															"Sales.analytics.categoryChart.tooltip.category",
														)}
													</span>
													<span className="font-bold text-muted-foreground">
														{data.name}
													</span>
												</div>
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														{t(
															"Sales.analytics.categoryChart.tooltip.percentage",
														)}
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
