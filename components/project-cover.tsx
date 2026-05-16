"use client";
import Image from "next/image";
import { useState } from "react";

interface ProjectCoverProps {
  url: string | null;
  alt: string;
  initials?: string;
  priority?: boolean;
  hidePreview?: boolean;
}

function PlaceholderCover({ initials }: { initials: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white dark:from-[#16161F] to-[#F5F0E8] dark:to-[#0A0A0F] flex items-center justify-center">
      <span className="text-6xl font-mono text-[#5C5C5C] dark:text-[#888899]">{initials}</span>
      <span className="absolute bottom-4 left-4 text-xs font-mono uppercase tracking-[0.2em] text-[#E85D04] dark:text-[#9D4EDD]">
        Private case study
      </span>
    </div>
  );
}

export function ProjectCover({
  url,
  alt,
  initials = "??",
  priority = false,
  hidePreview = false,
}: ProjectCoverProps) {
  const [errored, setErrored] = useState(false);

  if (!url || errored || hidePreview) {
    return <PlaceholderCover initials={initials} />;
  }

  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=1500`;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#16161F]">
      <Image
        src={screenshotUrl}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
