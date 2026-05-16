import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yeris Tech & Resources LLC — Product Studio",
    template: "%s — Yeris Tech",
  },
  description:
    "Yeris Tech & Resources LLC — a product studio shipping websites, apps, and AI agents for founders and operators.",
  metadataBase: new URL("https://yeristech.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yeristech.com",
    siteName: "Yeris Tech & Resources LLC",
    title: "Yeris Tech & Resources LLC — Product Studio",
    description:
      "We build the things companies wish they'd already shipped. A product studio for founders who don't have time to hire a team.",
    images: [
      {
        url: "/og?title=Yeris+Tech+%26+Resources+LLC&kicker=Product+Studio",
        width: 1200,
        height: 630,
        alt: "Yeris Tech & Resources LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeris Tech & Resources LLC — Product Studio",
    description:
      "We build the things companies wish they'd already shipped.",
    images: ["/og?title=Yeris+Tech+%26+Resources+LLC&kicker=Product+Studio"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-bg) text-(--color-fg)">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SiteNav />
        <div id="main-content" className="flex-1 flex flex-col pt-16">
          {children}
        </div>
        <SiteFooter />
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
