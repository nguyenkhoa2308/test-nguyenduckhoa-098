"use client";

import Link from "next/link";
import { cn } from "~/lib/utils";

type ButtonProps = {
  to?: string;
  href?: string;

  primary?: boolean;
  secondary?: boolean;

  outline?: boolean;
  outlineDarkColor?: boolean;

  rounded?: boolean;
  onlyIcon?: boolean;

  small?: boolean;
  large?: boolean;
  xLarge?: boolean;

  disabled?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  children?: React.ReactNode;

  className?: string;

  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  to,
  href,

  primary = false,
  secondary = false,

  outline = false,
  outlineDarkColor = false,

  rounded = false,
  onlyIcon = false,

  small = false,
  large = false,
  xLarge = false,

  disabled = false,

  leftIcon,
  rightIcon,

  children,

  className,

  onClick,

  ...passProps
}: ButtonProps) {
  const classes = cn(
    // base
    "inline-flex items-center justify-center min-w-[100px] min-h-[36px] px-4 py-[6px] rounded text-[16px] font-bold bg-white text-[rgb(22,24,35)] border border-transparent cursor-pointer select-none",

    // disabled
    disabled && "pointer-events-none opacity-50",

    // rounded
    rounded &&
      "rounded-full text-[rgba(22,24,35,0.75)] border-[rgba(22,24,35,0.12)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-[rgba(22,24,35,0.2)]",

    // outline
    outline && "text-primary border-current hover:bg-[rgba(254,44,85,0.06)]",

    // outline dark
    outlineDarkColor &&
      "border-[rgba(22,24,35,0.12)] bg-white font-semibold hover:bg-[rgba(22,24,35,0.03)]",

    // only icon
    onlyIcon && "h-[40px] min-w-[40px] p-0",

    // secondary
    secondary &&
      "bg-[rgba(0,0,0,0.05)] font-semibold hover:bg-[rgba(0,0,0,0.12)]",

    // primary
    primary &&
      "bg-primary border-primary text-white hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.06),rgba(0,0,0,0.06)),rgb(254,44,85)]",

    // sizes
    small && "min-w-[88px] px-4 py-1",

    large && "min-w-[88px] px-4 py-[10px]",

    xLarge && "min-w-[148px] px-4 py-[14px]",

    className,
  );
  const content = (
    <>
      {leftIcon && (
        <span className={children ? "flex mr-2" : "flex"}>{leftIcon}</span>
      )}

      {children && <span>{children}</span>}

      {rightIcon && (
        <span className={children ? "flex ml-2" : "flex"}>{rightIcon}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={disabled ? undefined : onClick}
        {...passProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classes}
      onClick={disabled ? undefined : onClick}
      {...passProps}
    >
      {content}
    </button>
  );
}
