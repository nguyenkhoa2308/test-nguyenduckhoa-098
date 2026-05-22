"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  to?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  avt?: React.ReactNode;
};

export default function MenuItem({
  title,
  to,
  onClick,
  icon,
  activeIcon,
  avt,
}: Props) {
  const pathname = usePathname();

  const isActive = to ? pathname === to : false;

  const content = (
    <>
      <span className="flex items-center justify-center">
        {avt ? avt : isActive && activeIcon ? activeIcon : icon}
      </span>

      <span>{title}</span>
    </>
  );

  if (to) {
    return (
      <Link
        href={to}
        className={`
            flex items-center gap-3 rounded-md p-2 font-bold
            transition-colors duration-200 ease-in-out
            ${
              isActive
                ? "text-primary"
                : "text-secondary hover:bg-[rgba(22,24,35,0.03)]"
            }
        `}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
            flex items-center gap-3 rounded-md p-2 font-bold
            transition-colors duration-200 ease-in-out cursor-pointer
            ${
              isActive
                ? "text-primary"
                : "text-secondary hover:bg-[rgba(22,24,35,0.03)]"
            }
        `}
    >
      {content}
    </button>
  );
}
