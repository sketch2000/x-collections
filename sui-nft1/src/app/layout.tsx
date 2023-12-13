import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// wagmi插件的provider
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUI-NFT1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-200"}>
        <Providers>{children}</Providers>
        {/* {children} */}
      </body>
    </html>
  );
}
