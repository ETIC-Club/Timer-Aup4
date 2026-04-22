import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMM Timer",
  description: "Pixel-perfect timer poster recreated from Figma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
