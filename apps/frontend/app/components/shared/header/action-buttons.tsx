"use client"

import { Bell, ShoppingCart, Wallet } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "../../ui/theme-toggle";
import { UserMenu } from "./user-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ConnectWalletModal } from "./connect-wallet-modal";
import { useState } from "react";

export const ActionButtons = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

	return (
		<div className="flex gap-1">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Button variant="ghost" size="icon" onClick={() => setIsWalletModalOpen(true)}>
							<Wallet className="!h-6 !w-6 transition-transform group-hover:scale-110" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content
						side="bottom"
						align="center"
						className="bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50"
					>
						<span>Connect Wallet</span>
					</Tooltip.Content>
				</Tooltip.Root>


				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Button variant="ghost" size="icon">
							<Bell className="!h-6 !w-6 transition-transform group-hover:scale-110" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content
						side="bottom"
						align="center"
						className="bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50"
					>
						<span>Notifications</span>
					</Tooltip.Content>
				</Tooltip.Root>


				<ThemeToggle />


				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Button variant="ghost" size="icon">
							<ShoppingCart className="!h-6 !w-6 transition-transform group-hover:scale-110" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content
						side="bottom"
						align="center"
						className="bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50"
					>
						<span>Shopping Cart</span>
					</Tooltip.Content>
				</Tooltip.Root>


				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<div>
							<UserMenu />
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content
						side="bottom"
						align="center"
						className="bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50"
					>
						<span>User Menu</span>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
      <ConnectWalletModal isOpen={isWalletModalOpen} onOpenChange={setIsWalletModalOpen} />
		</div>
	);
};
