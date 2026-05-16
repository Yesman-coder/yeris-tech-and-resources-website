"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Kicker } from "@/components/kicker";

function ContactContent() {
  const searchParams = useSearchParams();
  const fromEstimator = searchParams.get("from") === "estimator";
  const [prefillData, setPrefillData] = useState<{
    projectType?: string;
    budget?: string;
    message?: string;
  } | undefined>(undefined);

  useEffect(() => {
    if (fromEstimator) {
      const stored = sessionStorage.getItem("estimatorData");
      if (stored) {
        try {
          setPrefillData(JSON.parse(stored));
          sessionStorage.removeItem("estimatorData");
        } catch {
          // ignore parsing errors
        }
      }
    }
  }, [fromEstimator]);

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
        <div>
          <Kicker className="mb-4">Get in touch</Kicker>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
            Tell us what you want to build.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-12 max-w-lg">
            {fromEstimator 
              ? "Great! Based on your estimate, let's discuss the details. Fill in the form and we'll reply within one business day."
              : "Fill in the form and we'll reply within one business day. Prefer email? That works too."
            }
          </p>
          <ContactForm prefillData={prefillData} />
        </div>

        <aside className="flex flex-col gap-8 lg:pt-24">
          <div>
            <Kicker className="mb-2">Email</Kicker>
            <a
              href="mailto:yeristech@gmail.com"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              yeristech@gmail.com
            </a>
          </div>
          <div>
            <Kicker className="mb-2">Phone</Kicker>
            <a
              href="tel:+13054177464"
              className="text-base text-foreground hover:text-primary transition-colors"
            >
              (305) 417-7464
            </a>
          </div>
          <div>
            <Kicker className="mb-2">Location</Kicker>
            <p className="text-base text-muted-foreground">
              Caracas, Venezuela · Working with clients worldwide
            </p>
          </div>
          <div>
            <Kicker className="mb-2">Response time</Kicker>
            <p className="text-base text-muted-foreground">
              Within one business day — usually same day.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-32 mb-4" />
          <div className="h-12 bg-secondary rounded w-96 mb-6" />
          <div className="h-4 bg-secondary rounded w-64" />
        </div>
      </section>
    }>
      <ContactContent />
    </Suspense>
  );
}
