"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system" | "custom";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  customBg: string | null;
  setCustomBg: (src: string | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [customBg, setCustomBg] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("poetry-theme") as Theme | null;
    if (stored) setTheme(stored);
    const bgStored = localStorage.getItem("poetry-customBg");
    if (bgStored) setCustomBg(bgStored);
  }, []);

  useEffect(() => {
    localStorage.setItem("poetry-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (customBg) localStorage.setItem("poetry-customBg", customBg);
    else localStorage.removeItem("poetry-customBg");
  }, [customBg]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customBg, setCustomBg }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};