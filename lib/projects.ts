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

export const INDUSTRY_ES: Record<string, string> = {
  Community: "Comunidad",
  "Non-profit": "Sin fines de lucro",
  "AI & Automation": "IA y Automatización",
  "Financial Services": "Servicios Financieros",
  "E-commerce": "E-commerce",
  Fitness: "Fitness",
  "Civic Tech": "Tecnología Cívica",
  PropTech: "PropTech",
  Mobility: "Movilidad",
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  tagline: string; // one sentence shown on cards
  tagline_es: string;
  summary: string; // 2–3 sentences on case study page
  summary_es: string;
  industry: string;
  industry_es: string;
  year: number;
  liveUrl: string | null; // null = case study available on request
  vercelProjectId: string;
  services: string[]; // what Yeris delivered
  services_es: string[];
  stack: string[]; // what it's built with
  outcome?: string; // one-line result if known
  outcome_es?: string;
  featured: boolean; // appears on homepage
  hidePreview?: boolean; // true = skip screenshot, show placeholder (e.g. deployment protection)
};

export const projects: Project[] = [
  {
    slug: "stanton-financial",
    title: "Stanton Financial",
    client: "Stanton Financial",
    tagline: "Trust-first redesign for an independent financial advisor.",
    tagline_es:
      "Rediseño centrado en la confianza para un asesor financiero independiente.",
    summary:
      "A complete rebuild of Stanton Financial's online presence — credibility-led, conversion-tuned, and fast enough to win the LCP race on mobile. Replaced a dated WordPress site with a modern Next.js stack that the team can update themselves.",
    summary_es:
      "Una reconstrucción completa de la presencia en línea de Stanton Financial — liderada por credibilidad, optimizada para conversión y suficientemente rápida para ganar en LCP móvil. Reemplazamos un sitio WordPress desactualizado con un stack moderno en Next.js que el equipo puede actualizar por su cuenta.",
    industry: "Financial Services",
    industry_es: INDUSTRY_ES["Financial Services"],
    year: 2024,
    liveUrl: "https://stanton-financial.com",
    vercelProjectId: "prj_o8TPMNEMQAJa4mDDKjcZKwsAL0Mn",
    services: ["Brand refresh", "Web design", "Web development", "Copywriting"],
    services_es: [
      "Refresh de marca",
      "Diseño web",
      "Desarrollo web",
      "Redacción de contenido",
    ],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: true,
  },
  {
    slug: "born-leader-family-way",
    title: "The Born Leader Family Way",
    client: "The Born Leader Family Way (501c3)",
    tagline:
      "A non-profit homepage that turns visitors into donors and volunteers.",
    tagline_es:
      "Una página de inicio para una ONG que convierte visitantes en donantes y voluntarios.",
    summary:
      "Designed and built the public site for a family-focused non-profit. Clear narrative, prominent donate path, mobile-first donation flow, and a content model the founder can edit without code.",
    summary_es:
      "Diseñamos y construimos el sitio público para una organización sin fines de lucro centrada en familias. Narrativa clara, ruta de donación destacada, flujo mobile-first y un modelo de contenido que el fundador puede editar sin código.",
    industry: "Non-profit",
    industry_es: INDUSTRY_ES["Non-profit"],
    year: 2025,
    liveUrl: "https://thebornleaderfamilyway.org",
    vercelProjectId: "prj_mcEtWuG04JcqFAoKuSYQV9fPagaD",
    services: ["Web design", "Web development", "Donor flow UX"],
    services_es: ["Diseño web", "Desarrollo web", "UX del flujo de donación"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: true,
  },
  {
    slug: "ai-agents-for-alto",
    title: "AI Agents for Alto",
    client: "Alto",
    tagline: "Production AI agents that handle the work humans don't want to.",
    tagline_es:
      "Agentes de IA en producción que manejan el trabajo que los humanos no quieren hacer.",
    summary:
      "Designed, built, and deployed a suite of AI agents for Alto — covering triage, follow-up, and back-office automation. The agents reduced manual ticket-handling time and freed the team to focus on customer-facing work.",
    summary_es:
      "Diseñamos, construimos y desplegamos una suite de agentes de IA para Alto — cubriendo triage, seguimiento y automatización de back-office. Los agentes redujeron el tiempo de manejo manual de tickets y liberaron al equipo para enfocarse en el trabajo cara al cliente.",
    industry: "AI & Automation",
    industry_es: INDUSTRY_ES["AI & Automation"],
    year: 2025,
    liveUrl: "https://v0-ai-agents-for-alto.vercel.app",
    vercelProjectId: "prj_i55bEir5vlW8JKjrPZbEhANRBgIX",
    services: ["AI agent design", "Web development", "Workflow automation"],
    services_es: [
      "Diseño de agentes de IA",
      "Desarrollo web",
      "Automatización de flujos de trabajo",
    ],
    stack: ["Next.js", "Vercel AI SDK", "Vercel"],
    featured: true,
  },
  {
    slug: "shift-active",
    title: "Shift Active",
    client: "Shift Active",
    tagline: "A movement-and-recovery brand with a website that moves with it.",
    tagline_es:
      "Una marca de movimiento y recuperación con un sitio web que se mueve con ella.",
    summary:
      "End-to-end web build for an active-lifestyle brand. Bold typography, dense motion, and a structure built around shoppable content blocks.",
    summary_es:
      "Construcción web integral para una marca de estilo de vida activo. Tipografía audaz, movimiento intenso y una estructura construida alrededor de bloques de contenido comprables.",
    industry: "Fitness",
    industry_es: INDUSTRY_ES["Fitness"],
    year: 2024,
    liveUrl: "https://shiftactive.us",
    vercelProjectId: "prj_NQyePDbwKQR0MRKIfw7dgnfCyXtr",
    services: ["Web design", "Web development", "Motion design"],
    services_es: ["Diseño web", "Desarrollo web", "Diseño de movimiento"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    featured: true,
  },
  {
    slug: "fusfit-store",
    title: "FusFit Store",
    client: "FusFit",
    tagline: "An e-commerce storefront for a fitness apparel and gear brand.",
    tagline_es:
      "Una tienda de e-commerce para una marca de ropa y equipamiento fitness.",
    summary:
      "Headless storefront with a fast product grid, clean PDP, and a checkout path tuned for first-time mobile buyers.",
    summary_es:
      "Tienda headless con una grilla de productos rápida, PDP limpio y un flujo de checkout optimizado para compradores móviles primerizos.",
    industry: "E-commerce",
    industry_es: INDUSTRY_ES["E-commerce"],
    year: 2024,
    liveUrl: "https://v0-fusfit-store.vercel.app",
    vercelProjectId: "prj_TYyOpAsDB4RAMlG2vQeQ8cL3I9A5",
    services: ["E-commerce design", "Web development", "Product UX"],
    services_es: ["Diseño de e-commerce", "Desarrollo web", "UX de producto"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "rent-mate",
    title: "Rent Mate",
    client: "Rent Mate",
    tagline:
      "A rental-management app that removes the friction between owners and tenants.",
    tagline_es:
      "Una app de gestión de alquileres que elimina la fricción entre propietarios e inquilinos.",
    summary:
      "Mobile-first app for managing rental properties — listings, applications, payment tracking, and tenant messaging in a single dashboard.",
    summary_es:
      "App mobile-first para gestionar propiedades en alquiler — listados, solicitudes, seguimiento de pagos y mensajería con inquilinos en un solo dashboard.",
    industry: "PropTech",
    industry_es: INDUSTRY_ES["PropTech"],
    year: 2024,
    liveUrl: "https://v0-rent-mate-easy-app.vercel.app",
    vercelProjectId: "prj_yPdUTHkWtScKrGg1qaIMAt9GuN1f",
    services: ["Product design", "Web app development", "Auth & roles"],
    services_es: [
      "Diseño de producto",
      "Desarrollo de app web",
      "Auth y roles",
    ],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
    hidePreview: true,
  },
  {
    slug: "world-fixer",
    title: "World Fixer 2.0",
    client: "World Fixer",
    tagline:
      "A platform for connecting people who fix things with people who need them fixed.",
    tagline_es:
      "Una plataforma para conectar a personas que arreglan cosas con quienes las necesitan arregladas.",
    summary:
      "Second-generation rebuild of a community-driven service platform. Faster, cleaner, and built for scale across categories.",
    summary_es:
      "Reconstrucción de segunda generación de una plataforma de servicios impulsada por la comunidad. Más rápida, más limpia y construida para escalar en múltiples categorías.",
    industry: "Civic Tech",
    industry_es: INDUSTRY_ES["Civic Tech"],
    year: 2024,
    liveUrl: "https://v0-world-fixer-2-0-build.vercel.app",
    vercelProjectId: "prj_SOFKGemJ8qHBcGxZYS6q1eP6Auei",
    services: ["Product design", "Web app development"],
    services_es: ["Diseño de producto", "Desarrollo de app web"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "zulia-access",
    title: "Zulia Access",
    client: "Zulia Access",
    tagline: "A digital access portal serving the Zulia community.",
    tagline_es:
      "Un portal de acceso digital al servicio de la comunidad de Zulia.",
    summary:
      "Designed and shipped a community-facing access portal — bilingual-ready, mobile-first, and optimized for low-bandwidth conditions.",
    summary_es:
      "Diseñamos y lanzamos un portal de acceso orientado a la comunidad — listo para bilingüismo, mobile-first y optimizado para condiciones de bajo ancho de banda.",
    industry: "Community",
    industry_es: INDUSTRY_ES["Community"],
    year: 2025,
    liveUrl: "https://v0-zulia-access.vercel.app",
    vercelProjectId: "prj_bjEOW8qETm8FrU4lF6MwsVYB1iSM",
    services: ["Web design", "Web development", "Localization"],
    services_es: ["Diseño web", "Desarrollo web", "Localización"],
    stack: ["Next.js", "Tailwind CSS", "v0", "Vercel"],
    featured: false,
  },
  {
    slug: "moto-pana",
    title: "Moto Pana",
    client: "Moto Pana",
    tagline:
      "A mobility app for two-wheel transport — built for Latin American cities.",
    tagline_es:
      "Una app de movilidad para transporte de dos ruedas — construida para ciudades latinoamericanas.",
    summary:
      "Product design and engineering for a motorcycle-mobility app tailored to dense urban markets. Case study available on request.",
    summary_es:
      "Diseño de producto e ingeniería para una app de movilidad en motocicleta adaptada a mercados urbanos densos. Estudio de caso disponible bajo solicitud.",
    industry: "Mobility",
    industry_es: INDUSTRY_ES["Mobility"],
    year: 2025,
    liveUrl: null,
    vercelProjectId: "prj_ofV7iAztytM3Po8zfjz4Ebrgx7ni",
    services: ["Product design", "App development"],
    services_es: ["Diseño de producto", "Desarrollo de app"],
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
