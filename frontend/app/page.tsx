"use client";

import { FeatureSection } from "@/app/components/ui/feature-section";
import { HeroSection } from "@/app/components/ui/hero-section";
import { StatsSection } from "@/app/components/ui/stats-section";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function Home() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode") || "false");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  return (
    <main className="flex min-h-screen flex-col">
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "absolute",
          margin: "20px",
          width: "25px",
          height: "25px",
          right: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        {dark ? (
          <IoSunny style={{ width: "25px", height: "25px" }} />
        ) : (
          <IoMoon style={{ width: "25px", height: "25px" }} />
        )}
      </button>
      <HeroSection />
      <StatsSection />
      <FeatureSection />
    </main>
  );
}

