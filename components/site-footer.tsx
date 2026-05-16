import Link from "next/link";
import { ExternalLinkIcon } from "./external-link-icon";

export function SiteFooter() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg)">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200 w-fit"
          >
            <span className="inline-flex items-center justify-center bg-white rounded-md shrink-0" style={{ width: 32, height: 32, padding: 3 }}>
              <img
                src="/logo.png"
                alt=""
                width={26}
                height={26}
                className="object-contain"
                style={{ width: 26, height: 26 }}
              />
            </span>
            <span className="text-base font-medium text-(--color-fg)">
              Yeris<span className="text-(--color-accent)">.</span>
            </span>
          </Link>
          <p className="text-xs text-(--color-muted) font-mono">
            © {new Date().getFullYear()} Yeris Tech &amp; Resources LLC
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="mailto:yeristech@gmail.com"
            className="text-sm text-(--color-muted) hover:text-(--color-fg) transition-colors duration-200"
          >
            yeristech@gmail.com
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--color-muted) hover:text-(--color-fg) transition-colors duration-200"
          >
            LinkedIn <ExternalLinkIcon />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--color-muted) hover:text-(--color-fg) transition-colors duration-200"
          >
            GitHub <ExternalLinkIcon />
          </a>
          <Link
            href="/contact"
            className="text-sm text-(--color-muted) hover:text-(--color-fg) transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
