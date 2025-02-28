"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { useWallet } from "@/hooks/useWallet.hook";
import { FREIGHTER_ID, LOBSTR_ID } from "@creit.tech/stellar-wallets-kit";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";

interface WalletOption {
	id: string;
	name: string;
	icon: string;
}

interface ConnectWalletModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const walletOptions: WalletOption[] = [
	{
		id: "freighter",
		name: "Freighter",
		icon: "/images/freighter.png",
	},
	{
		id: "lobstr",
		name: "LOBSTR",
		icon: "/images/lobstr.png",
	},
];

export function ConnectWalletModal({
	isOpen,
	onOpenChange,
}: ConnectWalletModalProps) {
	const { t } = useTranslations();
	const { connectWallet, isConnecting, error } = useWallet();
	const [connectionError, setConnectionError] = useState<string | null>(null);

	const handleWalletConnect = async (wallet: WalletOption) => {
		setConnectionError(null);
		const result = await connectWallet(wallet.id);

		if (result.success) {
			console.log(`${t("common.wallet.connect")} ${wallet.name} exitoso!`);
			onOpenChange(false);
		} else {
			setConnectionError(result.error || "Error connecting wallet");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-bold">
						{t("common.wallet.title")}
					</DialogTitle>
					<DialogDescription>
						{t("common.wallet.description")}
					</DialogDescription>
				</DialogHeader>

				{connectionError && (
					<div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-center gap-2 mb-4">
						<AlertCircle className="h-4 w-4" />
						<p className="text-sm">{connectionError}</p>
					</div>
				)}

				<div className="flex flex-col gap-3 py-4">
					{walletOptions.map((wallet) => (
						<Button
							key={wallet.id}
							variant="outline"
							onClick={() => handleWalletConnect(wallet)}
							disabled={isConnecting}
							className="flex items-center justify-start gap-3 w-full p-4 h-auto hover:bg-muted transition-colors"
						>
							<div className="w-10 h-10 relative rounded-lg overflow-hidden">
								<Image
									src={wallet.icon || "/images/placeholder.png"}
									alt={`${wallet.name} logo`}
									fill
									className="object-cover"
								/>
							</div>
							<span className="font-bold">{wallet.name}</span>
							{isConnecting && wallet.id === FREIGHTER_ID && (
								<span className="ml-auto">Conectando...</span>
							)}
						</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
