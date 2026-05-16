import type { Metadata } from "next";
import Link from "next/link";
import { projects, featuredProjects } from "@/lib/projects";
import { HeroSection } from "@/components/sections/hero-section";
import { MethodSection } from "@/components/sections/method-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WorkSection } from "@/components/sections/work-section";
import { LabSection } from "@/components/sections/lab-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ShipmentsMarquee } from "@/components/shipments-marquee";

export const metadata: Metadata = {
  title: "Yeris Tech & Resources — Product Studio",
  description:
    "Diseñamos lo complejo, para que experimentes lo simple. Architecting the space between ambition & reality. Miami / LATAM.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ShipmentsMarquee projects={projects} />
      <MethodSection />
      <ServicesSection />
      <WorkSection projects={featuredProjects.slice(0, 3)} />
      <LabSection />
      <CtaSection />
    </>
  );
}
