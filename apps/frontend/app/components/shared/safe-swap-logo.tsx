"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme(); // Get the current theme
  const [mounted, setMounted] = useState(false); // Check if the component is mounted

  // Ensure the component has mounted before rendering (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
  }, []);
 // updating which logo should display 
  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/images/new-logo-dark.png"
      : "/images/new-logo-light.png";

  return (
    <Image
      src={logoSrc}
      alt="SafeSwap Logo"
      width={width ?? 200}
      height={height ?? 25}
      className={`transition-opacity duration-300 ${className}`}
      priority
    />
  );
}
