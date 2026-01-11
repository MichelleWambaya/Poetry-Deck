"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import { PoemCard, Poem } from "./PoemCard";
import { useGallery } from "@/context/gallery";
import { Toast } from "./Toast";

export type DeckState = "stacked" | "spread" | "sent";

function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getSpreadLayout(count: number) {
  const mid = (count - 1) / 2;
  return Array.from({ length: count }).map((_, i) => {
    const offset = i - mid;
    const angle = offset * 6 + randRange(-2, 2);
    const x = offset * 90 + randRange(-6, 6);
    const y = i * 28 + randRange(-4, 4);
    const z = 100 - i;
    return { angle, x, y, z };
  });
}

export function Deck({ initialPoems }: { initialPoems: Poem[] }) {
  const [poems, setPoems] = useState<Poem[]>(initialPoems);
  const [state, setState] = useState<DeckState>("stacked");
  const [toastOpen, setToastOpen] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef<number>(0);
  const { addItem } = useGallery();

  const spreadLayout = useMemo(() => getSpreadLayout(poems.length), [poems.length]);

  const shuffleTop = useCallback(() => {
    setPoems((list) => {
      if (list.length <= 1) return list;
      const [first, ...rest] = list;
      return [...rest, first];
    });
  }, []);

  const handleTopDragEnd = useCallback((info: { offsetX: number; offsetY: number }) => {
    const distance = Math.hypot(info.offsetX, info.offsetY);
    if (distance > 80) shuffleTop();
  }, [shuffleTop]);

  const handleDoubleTap = useCallback(() => {
    setState((s) => (s === "spread" ? "stacked" : "spread"));
  }, []);

  const handlePointerDownDouble = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      handleDoubleTap();
    }
    lastTapRef.current = now;
  }, [handleDoubleTap]);

  const handleSpreadTapAny = useCallback(() => setState("stacked"), []);

  const handleSend = useCallback(async () => {
    setState("sent");
  }, []);

  const handleSaveToGallery = useCallback(async () => {
    const target = topRef.current;
    if (!target) return;
    const canvas = await html2canvas(target, { backgroundColor: null, scale: 2, useCORS: true });
    const dataUrl = canvas.toDataURL("image/png", 0.92);
    const top = poems[0];
    addItem({ title: top.title, body: top.body, author: top.author || "guest", imageUrl: top.imageUrl || "", imageData: dataUrl });
    setToastOpen(true);
  }, [poems, addItem]);

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <motion.div layout className="relative w-80 h-[26rem]" onPointerDown={handlePointerDownDouble}>
          {poems.map((poem, i) => {
            const isTop = i === 0;
            const spread = spreadLayout[i];
            return (
              <motion.div
                key={poem.id}
                layout
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                onDoubleClick={handleDoubleTap}
                onClick={state === "spread" ? handleSpreadTapAny : undefined}
                style={{ zIndex: 100 - i }}
                animate={state === "spread" ? { x: spread.x, y: spread.y, rotate: spread.angle } : { x: 0, y: 0, rotate: i * -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                <PoemCard
                  poem={poem}
                  index={i}
                  isTop={isTop}
                  onTapTop={isTop ? shuffleTop : undefined}
                  onDragEnd={isTop ? handleTopDragEnd : undefined}
                  variant={state}
                  ref={isTop ? topRef : undefined}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between w-full max-w-[22rem]">
        <button onClick={shuffleTop} className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm"><span>+</span> Shuffle</button>
        <button onClick={handleDoubleTap} className="grid h-9 w-9 place-items-center rounded-full bg-black text-white">•</button>
        <button onClick={handleDoubleTap} className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm">Spread Pattern</button>
      </div>

      <AnimatePresence>
        {state === "sent" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative mt-6 flex w-[320px] flex-col items-center"
          >
            <motion.div layout className="relative h-40 w-[280px]">
              <div className="absolute inset-0 rounded-md bg-[#efe7db] shadow-xl" />
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 180 }}
                transition={{ duration: 0.8 }}
                className="absolute left-0 top-0 h-20 w-full origin-top"
                style={{
                  background: "linear-gradient(135deg, #f3ede2 50%, transparent 50%), linear-gradient(225deg, #f3ede2 50%, transparent 50%)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              />
            </motion.div>

            <div className="mt-4 flex items-center gap-3 text-xs">
              <button onClick={handleSaveToGallery} className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-black/80">Save to Gallery</button>
              <span className="text-neutral-600">Kept! Create a profile to start your own paper trail.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message="Kept! Create a profile to start your own paper trail." open={toastOpen} onClose={() => setToastOpen(false)} />
    </div>
  );
}