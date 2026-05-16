"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-(--color-bg)/80 backdrop-blur-md border-b border-(--color-border)"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-medium tracking-tight text-(--color-fg) hover:text-(--color-accent) transition-colors duration-200"
          aria-label="Yeris Tech home"
        >
          Yeris<span className="text-(--color-accent)">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-(--color-muted) hover:text-(--color-fg) transition-colors duration-150 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-(--color-accent) after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button
          asChild
          className="bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90 transition-opacity rounded-full text-sm font-medium px-5 h-9"
        >
          <Link href="/contact">Start a project</Link>
        </Button>
      </nav>
    </header>
  );
}
