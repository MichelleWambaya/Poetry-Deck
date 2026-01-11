"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

export type GalleryItem = {
  id: string;
  title: string;
  body: string;
  author: string;
  imageUrl: string;
  timestamp: number;
  imageData?: string; // base64 data from html2canvas
};

export type GalleryContextType = {
  items: GalleryItem[];
  addItem: (item: Omit<GalleryItem, "id" | "timestamp"> & { imageData?: string }) => void;
};

const GalleryContext = createContext<GalleryContextType | null>(null);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<GalleryItem[]>([]);

  const addItem: GalleryContextType["addItem"] = (item) => {
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        ...item,
      },
      ...prev,
    ]);
  };

  const value = useMemo(() => ({ items, addItem }), [items]);

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used within GalleryProvider");
  return ctx;
}