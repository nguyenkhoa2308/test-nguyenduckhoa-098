import type { Metadata } from "next";
import { tikTokFont } from "~/assets/fonts/fonts";

import "./globals.css";

import Sidebar from "~/components/layout/Sidebar/Sidebar";
import BottomNav from "~/components/layout/BottomNav/BottomNav";

export const metadata: Metadata = {
  title: "Video Feed App",
  // description:
  //   "Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${tikTokFont.className} min-h-full flex flex-col`}>
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Bottom Navbar */}
        <div className="block lg:hidden">
          <BottomNav />
        </div>

        <main className="lg:ml-[240px] lg:pb-0">{children}</main>
      </body>
    </html>
  );
}
