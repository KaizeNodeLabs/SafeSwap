import { BarChart3, Coins, Lock, Shield, Users, Zap } from "lucide-react";
import * as React from "react";

export function FeatureSection() {
	const features = [
		{
			icon: <Shield className="h-8 w-8" />,
			title: "Smart Contract Escrow",
			description:
				"Automated protection with Stellar smart contracts. Trustless Work API abstracts the complexities of smart contract configuration. It leverages the blockchain to ensure transactions are secure and transparent, providing fairness without bias in the marketplace. Read more on trustless Work: https://www.trustlesswork.com/",
			gradient: "from-blue-500 to-cyan-500",
		},
		{
			icon: <Zap className="h-8 w-8" />,
			title: "Lightning Settlement",
			description: "3-5 second finality on Stellar network",
			gradient: "from-yellow-500 to-orange-500",
		},
		{
			icon: <Lock className="h-8 w-8" />,
			title: "Non-Custodial Trading",
			description: "Keep full control of your assets",
			gradient: "from-purple-500 to-pink-500",
		},
		{
			icon: <Coins className="h-8 w-8" />,
			title: "Multi-Asset Support",
			description: "Trade any Stellar-based token",
			gradient: "from-green-500 to-emerald-500",
		},
		{
			icon: <Users className="h-8 w-8" />,
			title: "DAO Governance",
			description: "Community-driven protocol decisions",
			gradient: "from-red-500 to-pink-500",
		},
		{
			icon: <BarChart3 className="h-8 w-8" />,
			title: "Real-Time Analytics",
			description: "Advanced trading metrics & insights",
			gradient: "from-indigo-500 to-purple-500",
		},
	];

	return (
		<div className="relative bg-black/5 dark:bg-white/5 py-24">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-4">
					Built for the Future of Finance
				</h2>
				<p className="text-center text-muted-foreground mb-16 max-w-[600px] mx-auto">
					Leveraging the power of Stellar blockchain to provide a secure,
					efficient, and truly decentralized trading experience.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group relative p-6 rounded-xl bg-card hover:bg-card/50 transition-all duration-300"
						>
							<div
								className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${feature.gradient} rounded-xl transition-opacity duration-300`}
							/>
							<div className="relative">
								<div
									className={`mb-4 bg-gradient-to-br ${feature.gradient} text-white p-3 rounded-lg inline-block`}
								>
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
