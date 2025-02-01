"use client";

import { useTranslations } from "@/app/hooks/useTranslations";
import Image from "next/image";
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

	const handleWalletConnect = (wallet: WalletOption) => {
		console.log(`${t("common.wallet.connect")} ${wallet.name}...`);
		onOpenChange(false);
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
				<div className="flex flex-col gap-3 py-4">
					{walletOptions.map((wallet) => (
						<Button
							key={wallet.id}
							variant="outline"
							onClick={() => handleWalletConnect(wallet)}
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
						</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
