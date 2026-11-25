import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TrackVisit from "@/components/TrackVisit";
import { Analytics } from "@vercel/analytics/next";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : undefined;

export const viewport = {
  themeColor: "#F26B38",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  ...(siteOrigin ? { metadataBase: siteOrigin } : {}),
  title: {
    default: "Kumar S. — Creative Director",
    template: "%s — Kumar S.",
  },
  description:
    "Kumar S. is a creative director crafting visual stories and experiences across video editing, motion graphics, AI filmmaking, Blender 3D, and social media.",
  keywords: [
    "Kumar S.",
    "Creative Director",
    "Video Editing",
    "Motion Graphics",
    "AI Filmmaking",
    "Blender 3D",
    "Social Media",
  ],
  authors: [{ name: "Kumar S." }],
  creator: "Kumar S.",
  publisher: "Kumar S.",
  openGraph: {
    type: "website",
    locale: "en_US",
    ...(siteOrigin ? { url: siteOrigin } : {}),
    siteName: "Kumar S. — Creative Director",
    title: "Kumar S. — Creative Director",
    description: "Crafting visual stories. Creating experiences.",
    images: [{
      url: "/portfolio-placeholders/ai-filmmaking.png",
      alt: "Temporary cinematic visual study for Kumar S.’s creative portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar S. — Creative Director",
    description: "Crafting visual stories. Creating experiences.",
    images: ["/portfolio-placeholders/ai-filmmaking.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    ...(siteOrigin ? { canonical: siteOrigin } : {}),
  },
  category: "portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <TrackVisit />
        <div className="bottom-blur" aria-hidden="true" />
        {children}
        <Analytics />
        <NewsletterPopup />
      </body>
    </html>
  );
}
