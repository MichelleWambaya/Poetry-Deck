"use client";
import React, { useEffect } from "react";
import { useTheme } from "@/context/theme";

export function CustomBgImage() {
  const { customBg, theme } = useTheme();

  useEffect(() => {
    if (theme !== "custom") return;
    const root = document.documentElement;
    root.style.backgroundImage = customBg ? `url(${customBg})` : "";
    root.style.backgroundSize = "cover";
    root.style.backgroundPosition = "center";
    root.style.backgroundAttachment = "fixed";
    return () => {
      root.style.backgroundImage = "";
    };
  }, [customBg, theme]);

  if (theme !== "custom" || !customBg) return null;
  return (
    <img src={customBg} alt="" className="custom-bg" />
  );
}