import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yeris Tech & Resources — Product Studio",
    template: "%s — Yeris Tech",
  },
  description:
    "Diseñamos lo complejo, para que experimentes lo simple. A product studio architecting the space between ambition & reality.",
  metadataBase: new URL("https://yeristech.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yeristech.com",
    siteName: "Yeris Tech & Resources",
    title: "Yeris Tech & Resources — Product Studio",
    description:
      "Diseñamos lo complejo, para que experimentes lo simple. A product studio architecting the space between ambition & reality.",
    images: [
      {
        url: "/og?title=Yeris+Tech+%26+Resources&kicker=Product+Studio",
        width: 1200,
        height: 630,
        alt: "Yeris Tech & Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeris Tech & Resources — Product Studio",
    description:
      "Diseñamos lo complejo, para que experimentes lo simple.",
    images: ["/og?title=Yeris+Tech+%26+Resources&kicker=Product+Studio"],
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#FBF8F3] dark:bg-[#0A0A0F] text-[#1A1A1A] dark:text-[#F5F5F7]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            {/* Grain texture overlay */}
            <div className="grain-overlay" aria-hidden="true" />
            <SiteNav />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            <SiteFooter />
            <Toaster position="bottom-right" />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
