import * as React from "react";

export function StatsSection() {
	return (
		<div className="relative py-20 overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute inset-0 bg-primary/5 transform origin-top-left" />

			<div className="relative max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{
							label: "Total Volume",
							value: "$10M+",
							subtext: "Across all markets",
							change: "+25% this month",
						},
						{
							label: "Active Traders",
							value: "50K+",
							subtext: "Verified users",
							change: "+12% this week",
						},
						{
							label: "Successful Trades",
							value: "100K+",
							subtext: "With 0 disputes",
							change: "99.9% success rate",
						},
					].map((stat) => (
						<div key={stat.label} className="relative group">
							<div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300">
								<div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
									{stat.value}
								</div>
								<div className="text-lg font-medium mb-1">{stat.label}</div>
								<div className="text-sm text-muted-foreground">
									{stat.subtext}
								</div>
								<div className="text-xs text-primary/80 mt-2">
									{stat.change}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
