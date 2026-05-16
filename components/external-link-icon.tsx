import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      className={cn("inline-block w-3 h-3 ml-0.5 shrink-0", className)}
      aria-hidden="true"
    />
  );
}
