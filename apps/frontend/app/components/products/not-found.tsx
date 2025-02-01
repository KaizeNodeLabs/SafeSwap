"use client";

import { Button } from "@/app/components/ui/button";
import { useTranslations } from "@/app/hooks/useTranslations";
import { PackageX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
	const router = useRouter();
	const { t } = useTranslations();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center bg-primary">
			<PackageX className="w-24 h-24 text-muted-foreground text-bold" />
			<h1 className="text-2xl text-secondary font-bold mt-4">
				{t("common.notFound.title")}
			</h1>
			<p className="text-muted-foreground mt-2">
				{t("common.notFound.description")}
			</p>
			<div className="mt-6 space-x-4">
				<Button variant="secondary" onClick={() => router.push("/marketplace")}>
					{t("common.notFound.browseMarketplace")}
				</Button>
				<Button onClick={() => router.push("/")}>
					{t("common.notFound.goHome")}
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
