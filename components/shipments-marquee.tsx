"use client";

import { Project } from "@/lib/projects";

interface ShipmentsMarqueeProps {
  projects: Project[];
}

export function ShipmentsMarquee({ projects }: ShipmentsMarqueeProps) {
  // Create marquee items with industry tags
  const items = projects.map((p) => ({
    name: p.title,
    year: String(p.year).slice(-2),
    tag: p.industry.toLowerCase().split(" ")[0],
  }));

  // Double the items for seamless loop
  const doubledItems = [...items, ...items];

  return (
    <div className="border-t border-[#E0DAD0] dark:border-[#1E1E28] py-5 bg-[#F5F0E8] dark:bg-[#08080C] relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7">
        <div className="flex items-center gap-5">
          <div className="border-r border-[#D0C9BD] dark:border-[#2A2A35] pr-5 shrink-0">
            <p className="font-mono text-[10px] text-[#8A8A8A] dark:text-[#6B6B7B] tracking-[0.18em] leading-[1.5] text-right">
              recent<br/>shipments
            </p>
          </div>
          <div 
            className="flex-1 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="animate-marquee inline-flex gap-11 items-center whitespace-nowrap py-1.5">
              {doubledItems.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="font-serif italic text-[18px] text-[#1A1A1A] dark:text-[#F5F5F7]">
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.08em]">
                    [{item.year} · {item.tag}]
                  </span>
                  <span className="text-[#D0C9BD] dark:text-[#2A2A35] mx-1">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
