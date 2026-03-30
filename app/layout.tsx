import "./globals.css";
import type { Metadata, Viewport } from "next";
import { cormorant, dmSans } from "./fonts";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "RCB | Event Production",
  description: "Select your event type and experience elevated production with RCB. Audio, video, lighting, and seamless dance floors.",
  keywords: ["event production", "wedding dj", "corporate events", "quinceanera", "lighting rig", "LED screen"],
  openGraph: {
    title: "RCB | Event Production",
    description: "Select your event type and experience elevated production with RCB.",
    url: "https://rcbevents.com",
    siteName: "RCB Events",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RCB | Event Production",
    description: "Select your event type and experience elevated production with RCB.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#08070A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          cormorant.variable,
          dmSans.variable,
          "font-sans antialiased min-h-screen selection:bg-[var(--color-gold)] selection:text-white"
        )}
      >
        {children}
      </body>
    </html>
  );
}
