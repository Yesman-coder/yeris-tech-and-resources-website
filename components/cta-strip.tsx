"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function CtaStrip() {
  const { t } = useLanguage();
  
  return (
    <section className="bg-[#E85D04] dark:bg-[#9D4EDD]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/images/yeristech-logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-sm object-contain"
            style={{ width: 36, height: 36 }}
          />
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
            {t("Trabajemos juntos", "Let's work together")}
          </p>
        </div>
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] mb-12 max-w-3xl text-white">
          {t("¿Tienes algo que construir?", "Got something to build?")}
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-medium text-base px-8 py-4 rounded-2xl transition-opacity hover:opacity-80 active:scale-[0.97] bg-white dark:bg-[#0A0A0F] text-[#E85D04] dark:text-[#9D4EDD]"
        >
          {t("Iniciar proyecto →", "Start a project →")}
        </Link>
      </div>
    </section>
  );
}
