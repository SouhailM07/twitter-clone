import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// components
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import FollowPanel from "@/components/FollowPanel/FollowPanel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter x clone",
  description: "Generated by shadow",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-black text-white`}>
        <div className="max-w-[90rem] mx-auto flex">
          <ControlPanel />
          {children}
          <FollowPanel />
        </div>
      </body>
    </html>
  );
}
