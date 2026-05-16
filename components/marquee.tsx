interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-mono uppercase tracking-[0.15em] text-(--color-muted) shrink-0"
          >
            {item}
            <span className="ml-12 text-(--color-border)">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
