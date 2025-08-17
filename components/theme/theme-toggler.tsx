"use client";

import { useState } from "react";
import { MoonIcon, SunIcon } from "../icons";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function ThemeToggler() {
  const isMobile = useIsMobile();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
    document.body.classList.toggle("dark");
  }

  return (
    <div data-theme={isDarkMode ? "dark" : "light"} className={`absolute z-50 group p-1 flex gap-1 rounded-md border border-zinc-400 dark:border-zinc-600 ${isMobile ? "right-4 top-5" : "right-2 top-2"}`}>
      <Button onClick={toggleDarkMode} className="p-0 h-7 w-7 group-data-[theme=dark]:opacity-50 group-data-[theme=light]:bg-zinc-300 group-data-[theme=light]:pointer-events-none" variant="ghost">
        <SunIcon />
      </Button>
      <Button onClick={toggleDarkMode} className="p-0 h-7 w-7 group-data-[theme=light]:opacity-50 group-data-[theme=dark]:bg-zinc-600 group-data-[theme=dark]:pointer-events-none" variant="ghost">
        <MoonIcon />
      </Button>
    </div>
  )
};