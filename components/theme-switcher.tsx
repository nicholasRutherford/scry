"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("auto");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button isIconOnly aria-label="Like" onClick={toggleTheme}>
      {theme === "light" && "🌞"}
      {theme === "dark" && "🌙"}
      {theme === "auto" && "🤖"}
    </Button>
  );
}
