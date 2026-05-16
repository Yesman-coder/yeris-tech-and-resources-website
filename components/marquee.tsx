interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full flex flex-col gap-4" aria-hidden="true">
      {/* Row 1: left — foreground text, amber dots */}
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-base font-mono uppercase tracking-[0.15em] text-(--color-fg) shrink-0"
          >
            {item}
            <span className="ml-16 text-(--color-accent)">·</span>
          </span>
        ))}
      </div>

      {/* Row 2: right (reverse) — muted text, border dots */}
      <div className="flex animate-marquee-reverse whitespace-nowrap gap-16">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-mono uppercase tracking-[0.15em] text-(--color-muted) shrink-0"
          >
            {item}
            <span className="ml-16 text-(--color-border)">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
