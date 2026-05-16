"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative">
      <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
          <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
            <h1 className="mt-8 max-w-2xl text-balance font-serif text-5xl md:text-6xl lg:mt-16 xl:text-7xl text-theme-fg">
              {t(
                "Diseñamos lo complejo, para que experimentes lo simple.",
                "We design the complex, so you experience the simple."
              )}
            </h1>
            <p className="mt-8 max-w-2xl text-balance text-lg text-theme-muted">
              {t(
                "Un estudio de producto que arquitecta el espacio entre la ambición y la realidad. Construimos soluciones de software que escalan.",
                "A product studio architecting the space between ambition & reality. We build software solutions that scale."
              )}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full pl-5 pr-3 text-base"
              >
                <Link href="/contact">
                  <span className="text-nowrap">{t("Iniciar proyecto", "Start a project")}</span>
                  <ChevronRight className="ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 rounded-full px-5 text-base"
              >
                <Link href="/estimator">
                  <span className="text-nowrap">{t("¿Cuánto costará mi idea?", "How much will my idea cost?")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Video background with dark overlay */}
        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-theme sm:aspect-video lg:rounded-[3rem]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover"
            src="/videos/hero-animation.mp4"
            ref={(el) => { if (el) el.playbackRate = 0.5; }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70" />
        </div>
      </div>
    </section>
  );
}
