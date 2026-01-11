"use client";
import React, { useState } from "react";
import { useGallery } from "@/context/gallery";
import Image from "next/image";

export default function Gallery() {
  const { items } = useGallery();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = items.find((c) => c.id === selectedId);

  return (
    <div className="relative w-full min-h-screen bg-[#f1efea] p-4 sm:p-6 md:p-8">
      {/* card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedId(card.id)}
            className={`cursor-pointer transition-transform hover:scale-105 ${
              selectedId === card.id ? "ring-4 ring-black" : ""
            }`}
          >
            <div className="w-full rounded-xl border border-black/10 bg-white p-4 shadow-lg">
              {card.imageUrl && (
                <Image
                  src={card.imageUrl}
                  alt=""
                  width={320}
                  height={180}
                  className="mb-3 h-44 w-full rounded-lg object-cover"
                />
              )}
              <h3 className="mb-1 font-serif text-lg italic">{card.title}</h3>
              <p className="mb-2 text-sm text-neutral-600">{card.body}</p>
              <p className="text-xs text-neutral-500">— {card.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* floating Seal & Send */}
      {selected && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => {
              /* TODO: your send logic */
              alert(`Sealed & sent: “${selected.title}”`);
              setSelectedId(null);
            }}
            className="rounded-full bg-black px-6 py-3 text-white shadow-lg"
          >
            Seal & Send
          </button>
        </div>
      )}

      {items.length === 0 && (
        <div className="grid h-full place-items-center text-neutral-500">
          <p>No cards yet. Go create one!</p>
        </div>
      )}
    </div>
  );
}