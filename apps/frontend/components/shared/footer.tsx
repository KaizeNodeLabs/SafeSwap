"use client";

import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations();

	return (
		<footer className="flex items-center justify-between px-6 py-4 border-t">
			<div className="flex items-center gap-2">
				<Logo width={150} height={40} />
				<p className="text-sm text-muted-foreground">
					{t("common.footer.builtOn")}
				</p>
			</div>
			<div className="flex gap-4">
				<Link
					href="/marketplace"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
				>
					{t("common.footer.marketplace")}
				</Link>
			</div>
		</footer>
	);
}
