"use client";
export const dynamic = "force-dynamic";
import React, { useState, Suspense } from "react";
import { Deck } from "@/components/Deck";
import { useSearchParams, useRouter } from "next/navigation";
import { useGallery } from "@/context/gallery";
import { useTheme } from "@/context/theme";

const samplePoems = [
  { id: "1", title: "Streetlights", body: "The stars are just streetlights for the soul.", author: "papertrail", imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=60" },
  { id: "2", title: "Open Road", body: "A lane empty of plans", author: "papertrail", imageUrl: "https://images.unsplash.com/photo-1508087626084-6e89f1dcb65b?auto=format&fit=crop&w=800&q=60" },
  { id: "3", title: "Quiet Turn", body: "Coffee cold, thoughts old", author: "papertrail", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60" },
];

function ComposePanel({ onClose }: { onClose: () => void }) {
  const { addItem } = useGallery();
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    let imageUrl = samplePoems[0].imageUrl;
    if (theme === "dark") {
      imageUrl = samplePoems[1].imageUrl;
    } else if (theme === "light") {
      imageUrl = samplePoems[2].imageUrl;
    }

    addItem({ title, body, author: "guest", imageUrl });
    onClose();
  };

  return (
    <div className="fixed right-6 top-24 z-[200] w-[24rem] rounded-2xl border border-black/10 bg-[#f5f2ec] shadow-xl">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="italic text-2xl">New Poem</h2>
        <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-white shadow">✕</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 px-5 pb-5 pt-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Poem Title" className="w-full rounded-full border border-black/10 bg-white px-3 py-2" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Poem Body" className="w-full rounded-lg border border-black/10 bg-white px-3 py-2" rows={4}></textarea>

        <div className="mt-2 flex items-center justify-end">
          <button type="submit" className="rounded-full bg-black px-4 py-2 text-white shadow">Save to Gallery</button>
        </div>
      </form>
    </div>
  );
}

function HomeClient() {
  const router = useRouter();
  const params = useSearchParams();
  const showCompose = params.get("compose") === "1";
  const { items } = useGallery();

  const latestItem = items.length > 0 ? items[items.length - 1] : null;

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      {latestItem ? (
        <div className="w-80 rounded-xl border border-black/10 bg-white p-4 shadow-lg">
          {latestItem.imageUrl && (
            <img
              src={latestItem.imageUrl}
              alt=""
              className="mb-3 h-44 w-full rounded-lg object-cover"
            />
          )}
          <h3 className="mb-1 font-serif text-lg italic">{latestItem.title}</h3>
          <p className="mb-2 text-sm text-neutral-600">{latestItem.body}</p>
          <p className="text-xs text-neutral-500">— {latestItem.author}</p>
        </div>
      ) : (
        <Deck initialPoems={samplePoems} />
      )}
      {showCompose && <ComposePanel onClose={() => router.push("/")} />}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-neutral-600">Loading…</div>}>
      <HomeClient />
    </Suspense>
  );
}
