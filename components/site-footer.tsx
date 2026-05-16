"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#16161F] pt-14 pb-7 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-serif text-[30px] font-medium text-[#1A1A1A] dark:text-[#F5F5F7] tracking-[-0.01em]">
                Yeris
              </span>
              <span className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.08em]">
                [tech+resources]
              </span>
            </div>
            <p className="font-serif italic text-[17px] leading-[1.4] max-w-[280px] text-[#5C5C5C] dark:text-[#888899]">
              {t(
                "Arquitectando el espacio entre la ambición",
                "Architecting the space between ambition"
              )} <span className="text-[#E85D04] dark:text-[#9D4EDD]">&amp;</span> {t("la realidad.", "reality.")}
            </p>
          </div>

          {/* Studio links */}
          <div>
            <div className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.18em] mb-4">
              STUDIO
            </div>
            <div className="flex flex-col text-[13px] leading-[2] text-[#5C5C5C] dark:text-[#888899]">
              <Link href="/work" className="hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors">{t("Trabajo", "Work")}</Link>
              <Link href="/services" className="hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors">{t("Servicios", "Services")}</Link>
              <Link href="/lab" className="hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors">Lab</Link>
              <Link href="/about" className="hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors">{t("Nosotros", "About")}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.18em] mb-4">
              {t("CONTACTO", "CONTACT")}
            </div>
            <div className="flex flex-col text-[13px] leading-[2] text-[#5C5C5C] dark:text-[#888899]">
              <a href="mailto:info@yeristech.com" className="hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors">
                info@yeristech.com
              </a>
              <span>Caracas, Venezuela</span>
              <span>{t("Clientes en todo el mundo", "Clients worldwide")}</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-5 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]">
          <div className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.08em]">
            © mmxxvi · yeris tech and resources llc · {t("todos los derechos reservados", "all rights reserved")}
          </div>
          <div className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.08em]">
            {t("construido con", "built with")} next.js · vercel · <span className="text-[#E85D04] dark:text-[#9D4EDD]">claude</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
