"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { Moon, Sun } from "lucide-react";

const navLinks = [
  { href: "/work", labelEs: "Trabajo", labelEn: "Work" },
  { href: "/services", labelEs: "Servicios", labelEn: "Services" },
  { href: "/lab", labelEs: "Lab", labelEn: "Lab" },
  { href: "/about", labelEs: "Nosotros", labelEn: "About" },
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
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#FBF8F3]/80 dark:bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav
          className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7 h-[72px] flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-baseline gap-2 hover:opacity-80 transition-opacity duration-200"
            aria-label="Yeris Tech home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-serif text-[19px] font-medium tracking-[-0.01em] text-[#1A1A1A] dark:text-[#F5F5F7]">
              Yeris
            </span>
            <span className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.08em]">
              [tech+resources]
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-[#5C5C5C] dark:text-[#888899] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors duration-150"
              >
                {language === "es" ? link.labelEs : link.labelEn}
              </Link>
            ))}
            <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">|</span>
            <button
              onClick={toggleLanguage}
              className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
              aria-label={`Switch to ${language === "es" ? "English" : "Spanish"}`}
            >
              <span className={language === "en" ? "text-[#E85D04] dark:text-[#9D4EDD]" : ""}>en</span>
              {" "}
              <span className="text-[#E85D04] dark:text-[#9D4EDD]">/</span>
              {" "}
              <span className={language === "es" ? "text-[#E85D04] dark:text-[#9D4EDD]" : ""}>es</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="bg-[#F5F0E8] dark:bg-[#14141C] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] px-2.5 py-1.5 rounded-md text-[12px] text-[#5C5C5C] dark:text-[#888899] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {mounted && (
                theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )
              )}
            </button>
            <Link
              href="/contact"
              className="cta-hover bg-[#E85D04] dark:bg-[#9D4EDD] px-4 py-2 rounded-full text-[12px] text-white font-medium"
            >
              {t("Iniciar proyecto", "Start a project")} &nbsp;&rarr;
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#1A1A1A] dark:text-[#F5F5F7] hover:bg-[#F5F0E8] dark:hover:bg-[#14141C] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#FBF8F3] dark:bg-[#0A0A0F] flex flex-col px-6 pt-24 pb-12"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-serif text-4xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F5F5F7] hover:text-[#E85D04] dark:hover:text-[#9D4EDD] transition-colors duration-150 py-3 border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]"
                  >
                    {language === "es" ? link.labelEs : link.labelEn}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Mobile toggles */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={toggleLanguage}
                className="font-mono text-sm text-[#5C5C5C] dark:text-[#888899] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors"
              >
                <span className={language === "en" ? "text-[#E85D04] dark:text-[#9D4EDD]" : ""}>EN</span>
                {" / "}
                <span className={language === "es" ? "text-[#E85D04] dark:text-[#9D4EDD]" : ""}>ES</span>
              </button>
              <button 
                onClick={toggleTheme}
                className="bg-[#F5F0E8] dark:bg-[#14141C] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] px-3 py-2 rounded-md text-[#5C5C5C] dark:text-[#888899] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {mounted && (
                  theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )
                )}
              </button>
            </div>
            
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 bg-[#E85D04] dark:bg-[#9D4EDD] text-white font-medium text-base px-8 py-4 rounded-full active:scale-[0.97] transition-transform duration-100"
              >
                {t("Iniciar proyecto", "Start a project")} &rarr;
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
