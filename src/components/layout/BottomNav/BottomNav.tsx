"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ExploreIcon, HomeIcon, ProfileIcon } from "~/components/icons/Icons";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] h-[60px]">
      <div className="flex justify-around h-full">
        <Link
          href="/explore"
          className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
            pathname === "/explore" ? "text-primary" : "text-gray-500"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center">
            <ExploreIcon width="24px" height="24px" />
          </span>

          <span className="text-xs mt-1 font-semibold">Khám phá</span>
        </Link>

        <Link
          href="/"
          className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
            pathname === "/" ? "text-primary" : "text-gray-500"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center">
            <HomeIcon width="24px" height="24px" />
          </span>

          <span className="text-xs mt-1 font-semibold">Trang chủ</span>
        </Link>

        <Link
          href="/@username"
          className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
            pathname === "/@username" ? "text-primary" : "text-gray-500"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center">
            <ProfileIcon width="20px" height="20px" />
          </span>

          <span className="text-xs mt-1 font-semibold">Hồ sơ</span>
        </Link>
      </div>
    </nav>
  );
}
