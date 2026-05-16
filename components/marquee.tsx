interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full" aria-hidden="true">
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
    </div>
  );
}
