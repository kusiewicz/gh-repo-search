import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppQueryClientProvider } from "../providers/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Repository Search",
  description: "Search GitHub repositories with infinite scroll",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`p-10 ${inter.className}`}>
        <div className="from-primary-900/30 via-primary-900/10 absolute inset-0 bg-gradient-to-b to-transparent" />
        <AppQueryClientProvider>{children}</AppQueryClientProvider>
      </body>
    </html>
  );
}
