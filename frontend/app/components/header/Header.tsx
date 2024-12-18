"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SafeSwapLogo } from "@/app/components/ui/SafeSwapLogo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Search,
  ShoppingCart,
  Wallet,
  User,
  Settings,
  List,
  History,
} from "lucide-react";
import { IoMoon, IoSunny } from "react-icons/io5";
import SubHeader from "./subheader/SubHeader";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      setDark(JSON.parse(darkMode));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
      localStorage.setItem("darkMode", JSON.stringify(dark));
    }
  }, [dark]);

  const showSearchBar = searchTerm !== undefined && setSearchTerm !== undefined;

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-4 min-w-max">
          <Link href={"/"}>
            <SafeSwapLogo width={150} height={40} />
          </Link>
        </div>
        {showSearchBar ? (
          <div className="relative w-full pl-2 max-w-[18.75rem] md:w-[18.75rem]">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        ) : null}
        <div className="flex gap-4">
          <Button size="lg" className="group">
            <Wallet className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Connect Wallet
          </Button>
          <Button className="group h-auto">
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="group h-auto">
                <User className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <List className="mr-2 h-4 w-4" />
                My Listings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <History className="mr-2 h-4 w-4" />
                Transaction History
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <IoSunny className="w-6 h-6" />
            ) : (
              <IoMoon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>
    </>
  );
}
