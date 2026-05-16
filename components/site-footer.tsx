"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-theme-card pt-14 pb-7 border-t border-theme">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-serif text-[30px] font-medium text-theme-fg tracking-[-0.01em]">
                Yeris
              </span>
              <span className="font-mono text-[11px] text-theme-muted tracking-[0.08em]">
                [tech+resources]
              </span>
            </div>
            <p className="font-serif italic text-[17px] leading-[1.4] max-w-[280px] text-theme-muted">
              {t(
                "Arquitectando el espacio entre la ambición",
                "Architecting the space between ambition"
              )} <span className="text-theme-primary">&amp;</span> {t("la realidad.", "reality.")}
            </p>
          </div>

          {/* Studio links */}
          <div>
            <div className="font-mono text-[10px] text-theme-muted tracking-[0.18em] mb-4">
              STUDIO
            </div>
            <div className="flex flex-col text-[13px] leading-[2] text-theme-muted">
              <Link href="/work" className="hover:text-theme-fg transition-colors">{t("Trabajo", "Work")}</Link>
              <Link href="/services" className="hover:text-theme-fg transition-colors">{t("Servicios", "Services")}</Link>
              <Link href="/lab" className="hover:text-theme-fg transition-colors">Lab</Link>
              <Link href="/about" className="hover:text-theme-fg transition-colors">{t("Nosotros", "About")}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-[10px] text-theme-muted tracking-[0.18em] mb-4">
              {t("CONTACTO", "CONTACT")}
            </div>
            <div className="flex flex-col text-[13px] leading-[2] text-theme-muted">
              <a href="mailto:hello@yeristech.com" className="hover:text-theme-fg transition-colors">
                hello@yeristech.com
              </a>
              <span>Miami, FL</span>
              <span>+1 ··· ···· ····</span>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-[10px] text-theme-muted tracking-[0.18em] mb-4">
              SOCIAL
            </div>
            <div className="flex flex-col text-[13px] leading-[2] text-theme-muted">
              <a 
                href="https://twitter.com/yeristech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-theme-fg transition-colors"
              >
                X / Twitter
              </a>
              <a 
                href="https://linkedin.com/company/yeristech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-theme-fg transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/yesman-coder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-theme-fg transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-5 border-t border-theme">
          <div className="font-mono text-[10px] text-theme-muted tracking-[0.08em]">
            © mmxxvi · yeris tech and resources llc · {t("todos los derechos reservados", "all rights reserved")}
          </div>
          <div className="font-mono text-[10px] text-theme-muted tracking-[0.08em]">
            {t("construido con", "built with")} next.js · vercel · <span className="text-theme-primary">claude</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
