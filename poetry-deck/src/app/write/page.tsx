"use client";
import React, { useState } from "react";
import { useGallery } from "@/context/gallery";

export default function WritePage() {
  const { addItem } = useGallery();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setImageUrl(data);
      setPreview(data);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    addItem({
      title,
      body,
      author: author || "guest",
      imageUrl: imageUrl || "/globe.svg",
    });
    setTitle("");
    setBody("");
    setAuthor("");
    setImageUrl("");
    setPreview("");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 italic text-3xl">New Letter</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded border border-black/10 bg-white px-3 py-2 outline-none"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your poem here..."
          rows={5}
          className="w-full rounded border border-black/10 bg-white px-3 py-2 outline-none"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author (optional)"
            className="w-full rounded border border-black/10 bg-white px-3 py-2 outline-none"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full rounded border border-black/10 bg-white px-3 py-2 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="rounded border border-black/10 bg-black/5 px-3 py-2 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            Upload Image
          </label>
          <button type="button" onClick={() => { setImageUrl("/window.svg"); setPreview("/window.svg"); }} className="rounded border border-black/10 bg-black/5 px-3 py-2">Use Window</button>
          <button type="button" onClick={() => { setImageUrl("/globe.svg"); setPreview("/globe.svg"); }} className="rounded border border-black/10 bg-black/5 px-3 py-2">Use Globe</button>
          <button type="button" onClick={() => { setImageUrl("/file.svg"); setPreview("/file.svg"); }} className="rounded border border-black/10 bg-black/5 px-3 py-2">Use File</button>
        </div>

        {preview && (
          <div className="mt-3 rounded border border-black/10 bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" className="mx-auto h-40 object-contain" />
          </div>
        )}

        <button type="submit" className="rounded border border-black/10 bg-black text-white px-4 py-2">
          Save to Gallery
        </button>
      </form>
      <p className="mt-3 text-sm text-neutral-600">Saved items appear in your Profile.</p>
    </div>
  );
}