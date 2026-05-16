import { cn } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Pill({ children, active, onClick, className }: PillProps) {
  const isInteractive = typeof onClick === "function";

  if (isInteractive) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border transition-colors duration-200",
          active
            ? "bg-(--color-accent) text-(--color-accent-fg) border-(--color-accent)"
            : "bg-(--color-bg-elev) text-(--color-muted) border-(--color-border) hover:border-(--color-accent) hover:text-(--color-fg)",
          className
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-(--color-border) bg-(--color-bg-elev) text-(--color-muted)",
        className
      )}
    >
      {children}
    </span>
  );
}
