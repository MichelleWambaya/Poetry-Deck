"use client";
import { useTheme } from "@/context/theme";
import React from "react";

export function ThemeSwitcher() {
  const { theme, setTheme, customBg, setCustomBg } = useTheme();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomBg(url);
    setTheme("custom");
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="rounded-full border border-black/10 bg-white px-2 py-1 text-sm"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
        <option value="custom">Custom BG</option>
      </select>
      {theme === "custom" && (
        <label className="cursor-pointer rounded-full border border-black/10 bg-white px-2 py-1 text-sm">
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          📷
        </label>
      )}
    </div>
  );
}