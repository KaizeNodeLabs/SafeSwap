import NotFound from "@/components/shared/not-found";
import { useTranslations } from "next-intl";

const GlobalNotFound = () => {
	const t = useTranslations();
	return (
		<NotFound title={t("notFound.title")} description={t("notFound.message")} />
	);
};

export default GlobalNotFound;
