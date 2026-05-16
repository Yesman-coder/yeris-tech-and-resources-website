import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaStrip() {
  return (
    <section className="bg-(--color-bg-elev) border-t border-(--color-border)">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-accent) mb-4">
            Let&apos;s work together
          </p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-3">
            Got something to build?
          </h2>
          <p className="text-base text-(--color-muted) leading-relaxed max-w-md">
            Tell us about it. We&apos;ll reply within one business day.
          </p>
        </div>
        <div className="shrink-0">
          <Button
            asChild
            size="lg"
            className="bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90 transition-opacity font-medium text-base px-8 py-4 h-auto rounded-2xl"
          >
            <Link href="/contact">Start a project →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
