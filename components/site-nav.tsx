"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <motion.line
        x1="3" y1="7" x2="19" y2="7"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" y1="15" x2="19" y2="15"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
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
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200"
            aria-label="Yeris Tech home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="inline-flex items-center justify-center bg-white rounded-md shrink-0" style={{ width: 28, height: 28, padding: 2 }}>
              <img
                src="/logo.png"
                alt=""
                width={24}
                height={24}
                className="object-contain"
                style={{ width: 24, height: 24 }}
              />
            </span>
            <span className="text-lg font-medium tracking-tight text-(--color-fg)">
              Yeris<span className="text-(--color-accent)">.</span>
            </span>
          </Link>

          {/* Desktop links */}
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

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:inline-flex bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90 transition-opacity rounded-full text-sm font-medium px-5 h-9"
            >
              <Link href="/contact">Start a project</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-(--color-fg) hover:bg-(--color-bg-elev) transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-(--color-bg) flex flex-col px-6 pt-24 pb-12"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-4xl font-medium tracking-tight text-(--color-fg) hover:text-(--color-accent) transition-colors duration-150 py-3 border-b border-(--color-border)"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 bg-(--color-accent) text-(--color-accent-fg) font-medium text-base px-8 py-4 rounded-2xl active:scale-[0.97] transition-transform duration-100"
              >
                Start a project →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
