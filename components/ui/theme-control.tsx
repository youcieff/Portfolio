"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  function toggleTheme() {
    const nextTheme = isLight ? "dark" : "light";
    setTheme(nextTheme);
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", nextTheme === "light" ? "#f5f4fb" : "#090c19");
    });
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle color theme"
      title="Switch color theme"
      onClick={toggleTheme}
    >
      <Sun aria-hidden="true" className="sun-icon" size={18} strokeWidth={1.8} />
      <Moon aria-hidden="true" className="moon-icon" size={18} strokeWidth={1.8} />
    </button>
  );
}
