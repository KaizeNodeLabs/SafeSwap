"use client";

import { Bell, ShoppingCart, Wallet } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { useTranslations } from "@/app/hooks/useTranslations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { ConnectWalletModal } from "./connect-wallet-modal";
import { ShoppingCartModal } from "./shopping-cart-modal";
import { UserMenu } from "./user-menu";

export const ActionButtons = () => {
  const { t } = useTranslations();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <Wallet className="!h-6 !w-6 transition-transform group-hover:scale-110" />
                <span className="sr-only">{t("common.connectWallet")}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("common.connectWallet")}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="!h-6 !w-6 transition-transform group-hover:scale-110" />
                <span className="sr-only">{t("common.notifications")}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("common.notifications")}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartModalOpen(true)}
              >
                <ShoppingCart className="!h-6 !w-6 transition-transform group-hover:scale-110" />
                <span className="sr-only">{t("common.shoppingCart")}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("common.shoppingCart")}</p>
            </TooltipContent>
          </Tooltip>
          <UserMenu />
        </div>
      </div>
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
      />
      <ShoppingCartModal
        isOpen={isCartModalOpen}
        onOpenChange={setIsCartModalOpen}
      />
    </TooltipProvider>
  );
};
