import localFont from "next/font/local";

export const tikTokFont = localFont({
  src: [
    {
      path: "./TikTokFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./TikTokFont-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./TikTokFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tiktok",
});

export const tikTokDisplayFont = localFont({
  src: [
    {
      path: "./TikTokDisplayFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./TikTokDisplayFont-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./TikTokDisplayFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tiktok-display",
});
