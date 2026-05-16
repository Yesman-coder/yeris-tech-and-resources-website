// lib/projects.ts

export type Industry =
  | "Community"
  | "Non-profit"
  | "AI & Automation"
  | "Financial Services"
  | "E-commerce"
  | "Fitness"
  | "Civic Tech"
  | "PropTech"
  | "Mobility";

export type Project = {
  slug: string;
  title: string;
  client: string;
  tagline: string;            // one sentence shown on cards
  summary: string;            // 2–3 sentences on case study page
  industry: Industry;
  year: number;
  liveUrl: string | null;     // null = case study available on request
  vercelProjectId: string;
  services: string[];         // what Yeris delivered
  stack: string[];            // what it's built with
  outcome?: string;           // one-line result if known
  featured: boolean;          // appears on homepage
  hidePreview?: boolean;      // true = skip screenshot, show placeholder (e.g. deployment protection)
};

export const projects: Project[] = [
  {
    slug: "stanton-financial",
    title: "Stanton Financial",
    client: "Stanton Financial",
    tagline: "Trust-first redesign for an independent financial advisor.",
    summary:
      "A complete rebuild of Stanton Financial's online presence — credibility-led, conversion-tuned, and fast enough to win the LCP race on mobile. Replaced a dated WordPress site with a modern Next.js stack that the team can update themselves.",
    industry: "Financial Services",
    year: 2024,
    liveUrl: "https://stanton-financial.com",
    vercelProjectId: "prj_o8TPMNEMQAJa4mDDKjcZKwsAL0Mn",
    services: ["Brand refresh", "Web design", "Web development", "Copywriting"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: true,
  },
  {
    slug: "born-leader-family-way",
    title: "The Born Leader Family Way",
    client: "The Born Leader Family Way (501c3)",
    tagline: "A non-profit homepage that turns visitors into donors and volunteers.",
    summary:
      "Designed and built the public site for a family-focused non-profit. Clear narrative, prominent donate path, mobile-first donation flow, and a content model the founder can edit without code.",
    industry: "Non-profit",
    year: 2025,
    liveUrl: "https://thebornleaderfamilyway.org",
    vercelProjectId: "prj_mcEtWuG04JcqFAoKuSYQV9fPagaD",
    services: ["Web design", "Web development", "Donor flow UX"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: true,
  },
  {
    slug: "ai-agents-for-alto",
    title: "AI Agents for Alto",
    client: "Alto",
    tagline: "Production AI agents that handle the work humans don't want to.",
    summary:
      "Designed, built, and deployed a suite of AI agents for Alto — covering triage, follow-up, and back-office automation. The agents reduced manual ticket-handling time and freed the team to focus on customer-facing work.",
    industry: "AI & Automation",
    year: 2025,
    liveUrl: "https://v0-ai-agents-for-alto.vercel.app",
    vercelProjectId: "prj_i55bEir5vlW8JKjrPZbEhANRBgIX",
    services: ["AI agent design", "Web development", "Workflow automation"],
    stack: ["Next.js", "Vercel AI SDK", "Vercel"],
    featured: true,
  },
  {
    slug: "shift-active",
    title: "Shift Active",
    client: "Shift Active",
    tagline: "A movement-and-recovery brand with a website that moves with it.",
    summary:
      "End-to-end web build for an active-lifestyle brand. Bold typography, dense motion, and a structure built around shoppable content blocks.",
    industry: "Fitness",
    year: 2024,
    liveUrl: "https://shiftactive.us",
    vercelProjectId: "prj_NQyePDbwKQR0MRKIfw7dgnfCyXtr",
    services: ["Web design", "Web development", "Motion design"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    featured: true,
  },
  {
    slug: "fusfit-store",
    title: "FusFit Store",
    client: "FusFit",
    tagline: "An e-commerce storefront for a fitness apparel and gear brand.",
    summary:
      "Headless storefront with a fast product grid, clean PDP, and a checkout path tuned for first-time mobile buyers.",
    industry: "E-commerce",
    year: 2024,
    liveUrl: "https://v0-fusfit-store.vercel.app",
    vercelProjectId: "prj_TYyOpAsDB4RAMlG2vQeQ8cL3I9A5",
    services: ["E-commerce design", "Web development", "Product UX"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "rent-mate",
    title: "Rent Mate",
    client: "Rent Mate",
    tagline: "A rental-management app that removes the friction between owners and tenants.",
    summary:
      "Mobile-first app for managing rental properties — listings, applications, payment tracking, and tenant messaging in a single dashboard.",
    industry: "PropTech",
    year: 2024,
    liveUrl: "https://v0-rent-mate-easy-app.vercel.app",
    vercelProjectId: "prj_yPdUTHkWtScKrGg1qaIMAt9GuN1f",
    services: ["Product design", "Web app development", "Auth & roles"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "world-fixer",
    title: "World Fixer 2.0",
    client: "World Fixer",
    tagline: "A platform for connecting people who fix things with people who need them fixed.",
    summary:
      "Second-generation rebuild of a community-driven service platform. Faster, cleaner, and built for scale across categories.",
    industry: "Civic Tech",
    year: 2024,
    liveUrl: "https://v0-world-fixer-2-0-build.vercel.app",
    vercelProjectId: "prj_SOFKGemJ8qHBcGxZYS6q1eP6Auei",
    services: ["Product design", "Web app development"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "zulia-access",
    title: "Zulia Access",
    client: "Zulia Access",
    tagline: "A digital access portal serving the Zulia community.",
    summary:
      "Designed and shipped a community-facing access portal — bilingual-ready, mobile-first, and optimized for low-bandwidth conditions.",
    industry: "Community",
    year: 2025,
    liveUrl: "https://v0-zulia-access.vercel.app",
    vercelProjectId: "prj_bjEOW8qETm8FrU4lF6MwsVYB1iSM",
    services: ["Web design", "Web development", "Localization"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "moto-pana",
    title: "Moto Pana",
    client: "Moto Pana",
    tagline: "A mobility app for two-wheel transport — built for Latin American cities.",
    summary:
      "Product design and engineering for a motorcycle-mobility app tailored to dense urban markets. Case study available on request.",
    industry: "Mobility",
    year: 2025,
    liveUrl: null,
    vercelProjectId: "prj_ofV7iAztytM3Po8zfjz4Ebrgx7ni",
    services: ["Product design", "App development"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getRelatedProjects(slug: string, limit = 2) {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.industry === current.industry ? 0 : 1;
      const bMatch = b.industry === current.industry ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}
