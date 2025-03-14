"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";

type NotFoundProps = {
	icon?: React.ElementType;
	title: string;
	description: string;
};

const NotFound = ({
	icon: Icon = AlertCircle,
	title,
	description,
}: NotFoundProps) => {
	const t = useTranslations();
	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4">
			<Icon className="h-24 w-24 text-muted-foreground mb-8" />
			<h1 className="text-4xl font-bold mb-4">{title}</h1>
			<p className="text-lg text-muted-foreground mb-8 text-center">
				{description}
			</p>
			<div className="flex gap-4">
				<Button asChild>
					<Link href="/marketplace">{t("notFound.browser")}</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/">{t("notFound.return")}</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
