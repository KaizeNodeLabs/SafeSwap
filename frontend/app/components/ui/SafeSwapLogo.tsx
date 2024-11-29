import Image from "next/image";
import { useEffect, useState } from "react";

interface SafeSwapLogoProps {
	width?: number;
	height?: number;
	className?: string;
}

export function SafeSwapLogo({
	width = 200,
	height = 25,
	className = "",
}: SafeSwapLogoProps) {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			setDark(JSON.parse(darkMode));
		}
	}, []);
	const logoSrc =
		dark === true
			? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-PafBbOMlMn7QXOSIAXWmCntdVeMf6c.svg"
			: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-light-kflz9CbOrw3HdQY9IJs5nkti9C17jJ.svg";

	return (
		<Image
			src={logoSrc}
			alt="SafeSwap Logo"
			width={width}
			height={height}
			className={`transition-opacity duration-300 ${className}`}
			priority
		/>
	);
}
