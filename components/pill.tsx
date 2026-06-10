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
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border transition-colors duration-200 cursor-pointer",
          active
            ? "bg-secondary text-secondary-foreground"
            : "bg-background text-foreground border-border hover:border-secondary",
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-black/10 dark:border-white/10 bg-white dark:bg-[#16161F] text-[#5C5C5C] dark:text-[#888899]",
        className,
      )}
    >
      {children}
    </span>
  );
}
