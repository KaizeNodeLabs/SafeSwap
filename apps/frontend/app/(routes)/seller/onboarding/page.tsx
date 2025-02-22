"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Globe, Globe2, Mail, MessageSquare, Text, Wallet } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OnboardingPage() {
	const [country, setCountry] = useState<string | null>(null);

	function handleSetCountry(value: string): void {
		setCountry(value);
	}

	return (
		<section className="w-full h-full flex flex-col items-center justify-center ">
			<header className="flex flex-col items-center space-y-2 text-center">
				<h1 className="text-2xl font-semibold">Start Selling on SafeSwap</h1>
				<p className="text-gray-500 w-2/3 ">
					Join our decentralized marketplace and start selling with Stellar
					escrow. Secure, fast and no storefront needed
				</p>
			</header>

			<Card className="mt-6 w-[45%] shadow-sm px-1.5 py-4 rounded-lg bg-white">
				<CardContent className="space-y-4">
					<div className="relative flex flex-col gap-1.5">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="email@gmail.com"
							className="pl-10 focus:outline-none"
						/>
						<Mail className="absolute top-7 left-3 text-gray-500" size={20} />
					</div>

					<div className="relative flex flex-col gap-1.5">
						<Label htmlFor="wallet">Stellar Wallet Address</Label>
						<Input
							id="wallet"
							type="text"
							placeholder="GDDG...P5E7"
							className="pl-10 focus:outline-none"
						/>
						<Wallet className="absolute top-7 left-3 text-gray-500" size={20} />
					</div>

					<div className="relative flex flex-col gap-1.5">
						<Label htmlFor="username">Telegram Username (Optional)</Label>
						<Input
							id="username"
							type="text"
							placeholder="@username"
							className="pl-10 focus:outline-none"
						/>
						<MessageSquare
							className="absolute top-7 left-3 text-gray-500"
							size={20}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="country">Country</Label>

						<Select onValueChange={setCountry}>
							<SelectTrigger className="pl-10">
								<SelectValue placeholder="Select your country" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="us">United States</SelectItem>
								<SelectItem value="uk">United Kingdom</SelectItem>
								<SelectItem value="ng">Nigeria</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex space-x-3">
						<Checkbox />

						<div className="inline-flex flex-col space-y-1">
							<Label> I agree to the terms and conditions</Label>
							<p className="text-xs text-gray-500">
								By checking this box, you agreee to the our Terms of Service and
								Privacy Policy.
							</p>
						</div>
					</div>

					<Button className="w-full" size="default">
						Start Selling
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
