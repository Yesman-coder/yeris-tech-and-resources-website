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
            ? "bg-[#E85D04] dark:bg-[#9D4EDD] text-white border-[#E85D04] dark:border-[#9D4EDD]"
            : "bg-white dark:bg-[#16161F] text-[#5C5C5C] dark:text-[#888899] border-black/10 dark:border-white/10 hover:border-[#E85D04] dark:hover:border-[#9D4EDD] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7]",
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
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-black/10 dark:border-white/10 bg-white dark:bg-[#16161F] text-[#5C5C5C] dark:text-[#888899]",
        className
      )}
    >
      {children}
    </span>
  );
}
