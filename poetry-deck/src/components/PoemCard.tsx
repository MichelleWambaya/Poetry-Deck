"use client";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

export type Poem = {
  id: string;
  title: string;
  body: string;
  author?: string;
  imageUrl?: string;
  imageData?: string; // base64 or blob from html2canvas
};

export const PoemCard = forwardRef<HTMLDivElement, {
  poem: Poem;
  index: number;
  isTop: boolean;
  onTapTop?: () => void;
  onDragEnd?: (info: { offsetX: number; offsetY: number }) => void;
  variant?: "stacked" | "spread" | "sent";
}>(function PoemCard({ poem, index, isTop, onTapTop, onDragEnd, variant = "stacked" }, ref) {
  const isSvg = poem.imageUrl?.endsWith(".svg") ?? false;
  const isDataLike = poem.imageUrl?.startsWith("data:") || poem.imageUrl?.startsWith("blob:") || !!poem.imageData;
  const isRemote = !!poem.imageUrl && /^https?:\/\//.test(poem.imageUrl);

  return (
    <motion.div
      ref={ref}
      drag={isTop ? true : false}
      dragElastic={0.2}
      dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
      onDragEnd={(_, info) => onDragEnd?.({ offsetX: info.offset.x, offsetY: info.offset.y })}
      onTap={isTop ? onTapTop : undefined}
      className="select-none"
    >
      <div className="w-60 rounded-lg bg-white shadow-xl ring-1 ring-black/5">
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-white">
          {isDataLike ? (
            <img src={poem.imageData || poem.imageUrl} alt="card" className="h-full w-full object-cover grayscale" />
          ) : isSvg ? (
            <img src={poem.imageUrl} alt="card" className="h-full w-full object-contain p-6 bg-white" />
          ) : (
            <img
              src={poem.imageUrl}
              alt="card"
              className="h-full w-full object-cover grayscale"
              crossOrigin={isRemote ? "anonymous" : undefined}
              referrerPolicy={isRemote ? "no-referrer" : undefined}
              loading="lazy"
            />
          )}
        </div>
        <div className="px-4 py-3">
          <div className="text-[0.8rem] text-neutral-600">{poem.author}</div>
          <div className="font-eb text-[1.05rem] leading-tight text-neutral-900">{poem.title}</div>
          <div className="mt-1 text-[0.92rem] leading-snug text-neutral-800">{poem.body}</div>
        </div>
      </div>
    </motion.div>
  );
});