import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { GalleryProvider } from "@/context/gallery";
import { ThemeProvider } from "@/context/theme";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CustomBgImage } from "@/components/CustomBgImage";

const garamond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Paper Trail",
  description: "Paper Trail — compose and keep your poems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} antialiased text-neutral-900`}>
        <ThemeProvider>
          <CustomBgImage />
          <GalleryProvider>
            <header className="w-full">
              <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <Link href="/" className="italic text-3xl tracking-tight">Paper Trail</Link>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/gallery" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm">My Gallery</Link>
                  <Link href="/profile" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm">Profile</Link>
                  <Link href="/auth" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm">Login</Link>
                  <Link href="/?compose=1" className="rounded-full bg-black px-4 py-2 text-sm text-white shadow-sm">Compose</Link>
                  <ThemeSwitcher />
                </div>
              </nav>
            </header>

            <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-6">{children}</main>
          </GalleryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
