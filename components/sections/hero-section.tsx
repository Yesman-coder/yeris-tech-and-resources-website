"use client";

import Link from "next/link";
import { useScroll, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative">
      <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
          <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
            <h1 className="mt-8 max-w-2xl text-balance font-serif text-5xl md:text-6xl lg:mt-16 xl:text-7xl text-foreground">
              {t(
                "Diseñamos lo complejo, para que experimentes lo simple.",
                "We design the complex, so you experience the simple."
              )}
            </h1>
            <p className="mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
              {t(
                "Un estudio de producto que arquitecta el espacio entre la ambición y la realidad. Construimos soluciones de software que escalan.",
                "A product studio architecting the space between ambition & reality. We build software solutions that scale."
              )}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full pl-5 pr-3 text-base bg-primary hover:bg-primary/90"
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
                className="h-12 rounded-full px-5 text-base hover:bg-secondary"
              >
                <Link href="/estimator">
                  <span className="text-nowrap">{t("¿Cuánto costará mi idea?", "How much will my idea cost?")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Video background with dark overlay */}
        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-border sm:aspect-video lg:rounded-[3rem]">
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
          <div className="absolute inset-0 bg-black/60 dark:bg-black/50" />
        </div>
      </div>
      
      {/* Logo slider section */}
      <div className="bg-background pb-2">
        <div className="group relative m-auto max-w-7xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:max-w-44 md:border-r md:border-border md:pr-6">
              <p className="text-end text-sm text-muted-foreground">
                {t("Potenciando los mejores equipos", "Powering the best teams")}
              </p>
            </div>
            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              <InfiniteSlider
                speedOnHover={20}
                speed={40}
                gap={112}
              >
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">NVIDIA</span>
                </div>
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">GitHub</span>
                </div>
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">Nike</span>
                </div>
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">LemonSqueezy</span>
                </div>
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">Laravel</span>
                </div>
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">OpenAI</span>
                </div>
                <div className="flex items-center justify-center h-8">
                  <span className="font-mono text-sm text-muted-foreground/60 dark:text-muted-foreground">Vercel</span>
                </div>
              </InfiniteSlider>

              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                direction="right"
                blurIntensity={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
