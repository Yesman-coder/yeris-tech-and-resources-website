import { cn } from "@/lib/utils";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

export function Kicker({ children, className }: KickerProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono uppercase tracking-[0.2em] text-(--color-muted)",
        className
      )}
    >
      {children}
    </p>
  );
}
