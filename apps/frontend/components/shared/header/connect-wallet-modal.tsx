"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { useWallet } from "@/hooks/useWallet.hook";
import { FREIGHTER_ID, LOBSTR_ID } from "@creit.tech/stellar-wallets-kit";
import { AlertCircle, Check, Copy, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
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
	const {
		connectWallet,
		disconnectWallet,
		isConnecting,
		error,
		isConnected,
		walletAddress,
		walletName,
	} = useWallet();
	const [connectionError, setConnectionError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

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

	const handleDisconnect = async () => {
		const result = await disconnectWallet();
		if (!result.success) {
			setConnectionError(result.error || "Error al desconectar la wallet");
		}
	};

	const truncateAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const copyAddress = () => {
		if (walletAddress) {
			navigator.clipboard.writeText(walletAddress);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-bold">
						{isConnected
							? `${t("common.wallet.connected")}`
							: `${t("common.wallet.title")}`}
					</DialogTitle>
					<DialogDescription>
						{isConnected
							? `${t("common.wallet.connected_description")}`
							: `${t("common.wallet.description")}`}
					</DialogDescription>
				</DialogHeader>

				{connectionError && (
					<div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-center gap-2 mb-4">
						<AlertCircle className="h-4 w-4" />
						<p className="text-sm">{connectionError}</p>
					</div>
				)}

				{isConnected && (
					<div className="bg-muted p-3 rounded-md mb-4">
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-medium">{walletName}</p>
								<div className="flex items-center gap-1">
									<p className="text-xs text-muted-foreground">
										{truncateAddress(walletAddress || "")}
									</p>
									<button
										onClick={copyAddress}
										className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6 p-0"
									>
										{copied ? (
											<Check className="h-3 w-3" />
										) : (
											<Copy className="h-3 w-3" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="flex flex-col gap-3 py-4">
					{walletOptions.map((wallet) => (
						<Button
							key={wallet.id}
							variant="outline"
							onClick={() => handleWalletConnect(wallet)}
							disabled={
								isConnecting || (isConnected && walletName === wallet.name)
							}
							className={`flex items-center justify-start gap-3 w-full p-4 h-auto hover:bg-muted transition-colors ${
								isConnected && walletName === wallet.name
									? "border-primary"
									: ""
							}`}
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
							{isConnecting && wallet.id === wallet.id && (
								<span className="ml-auto">Conectando...</span>
							)}
							{isConnected && walletName === wallet.name && (
								<span className="ml-auto text-primary text-sm">Conectada</span>
							)}
						</Button>
					))}
				</div>

				{isConnected && (
					<DialogFooter>
						<Button
							variant="outline"
							onClick={handleDisconnect}
							className="text-destructive hover:text-destructive hover:bg-destructive/10"
						>
							<LogOut className="h-4 w-4 mr-2" />
							Desconectar
						</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
