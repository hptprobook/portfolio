import type { Metadata } from "next";
import "./globals.css";
import Header from "@/layouts/Header/Header";

export const metadata: Metadata = {
  title: "Portfolio - AB",
  description: "Personal portfolio website showcasing my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
