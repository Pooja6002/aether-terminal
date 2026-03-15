import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "AI Geopolitical Intelligence",
  description: "Next-generation AI geopolitical intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
