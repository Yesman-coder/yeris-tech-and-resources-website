"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Kicker } from "@/components/kicker";
import { useLanguage } from "@/components/language-provider";

function ContactContent() {
  const searchParams = useSearchParams();
  const fromEstimator = searchParams.get("from") === "estimator";
  const { t } = useLanguage();
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
          <Kicker className="mb-4">{t("Contacto", "Get in touch")}</Kicker>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F5F5F7] mb-6">
            {t("Cuéntanos qué quieres construir.", "Tell us what you want to build.")}
          </h1>
          <p className="text-base text-[#5C5C5C] dark:text-[#888899] leading-relaxed mb-12 max-w-lg">
            {fromEstimator 
              ? t(
                  "Basado en tu estimación, hablemos de los detalles. Llena el formulario y te respondemos en un día hábil.",
                  "Great! Based on your estimate, let's discuss the details. Fill in the form and we'll reply within one business day."
                )
              : t(
                  "Llena el formulario y te respondemos en un día hábil. ¿Prefieres email? También funciona.",
                  "Fill in the form and we'll reply within one business day. Prefer email? That works too."
                )
            }
          </p>
          <ContactForm prefillData={prefillData} />
        </div>

        <aside className="flex flex-col gap-8 lg:pt-24">
          <div>
            <Kicker className="mb-2">Email</Kicker>
            <a
              href="mailto:info@yeristech.com"
              className="text-base text-[#1A1A1A] dark:text-[#F5F5F7] hover:text-[#E85D04] dark:hover:text-[#9D4EDD] transition-colors"
            >
              info@yeristech.com
            </a>
          </div>
          <div>
            <Kicker className="mb-2">{t("Teléfono", "Phone")}</Kicker>
            <a
              href="tel:+13054177464"
              className="text-base text-[#1A1A1A] dark:text-[#F5F5F7] hover:text-[#E85D04] dark:hover:text-[#9D4EDD] transition-colors"
            >
              (305) 417-7464
            </a>
          </div>
          <div>
            <Kicker className="mb-2">{t("Ubicación", "Location")}</Kicker>
            <p className="text-base text-[#5C5C5C] dark:text-[#888899]">
              {t("Caracas, Venezuela · Trabajamos con clientes en todo el mundo", "Caracas, Venezuela · Working with clients worldwide")}
            </p>
          </div>
          <div>
            <Kicker className="mb-2">{t("Tiempo de respuesta", "Response time")}</Kicker>
            <p className="text-base text-[#5C5C5C] dark:text-[#888899]">
              {t("En un día hábil — usualmente el mismo día.", "Within one business day — usually same day.")}
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
          <div className="h-8 bg-[#F5F0E8] dark:bg-[#14141C] rounded w-32 mb-4" />
          <div className="h-12 bg-[#F5F0E8] dark:bg-[#14141C] rounded w-96 mb-6" />
          <div className="h-4 bg-[#F5F0E8] dark:bg-[#14141C] rounded w-64" />
        </div>
      </section>
    }>
      <ContactContent />
    </Suspense>
  );
}
