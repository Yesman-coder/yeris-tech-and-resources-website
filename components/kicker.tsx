import { cn } from "@/lib/utils";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

export function Kicker({ children, className }: KickerProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono uppercase tracking-[0.2em] text-[#5C5C5C] dark:text-[#888899]",
        className
      )}
    >
      {children}
    </p>
  );
}
