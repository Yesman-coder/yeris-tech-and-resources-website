"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";

export function CtaStrip() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/images/yeristech-logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-sm object-contain"
            style={{ width: 36, height: 36 }}
          />
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
            {t("Trabajemos juntos", "Let's work together")}
          </p>
        </div>
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] mb-12 max-w-3xl text-primary">
          {t("¿Tienes algo que construir?", "Got something to build?")}
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-medium text-base px-8 py-4 rounded-2xl transition-opacity hover:opacity-80 active:scale-[0.97] bg-primary text-background"
        >
          {t("Iniciar proyecto →", "Start a project →")}
        </Link>
      </div>
    </section>
  );
}
