import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Kicker } from "@/components/kicker";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you want to build. We'll reply within one business day.",
};

export default function ContactPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
        <div>
          <Kicker className="mb-4">Get in touch</Kicker>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-6">
            Tell us what you want to build.
          </h1>
          <p className="text-base text-(--color-muted) leading-relaxed mb-12 max-w-lg">
            Fill in the form and we&apos;ll reply within one business day. Prefer email? That works too.
          </p>
          <ContactForm />
        </div>

        <aside className="flex flex-col gap-8 lg:pt-24">
          <div>
            <Kicker className="mb-2">Email</Kicker>
            <a
              href="mailto:yeristech@gmail.com"
              className="text-base text-(--color-fg) hover:text-(--color-accent) transition-colors"
            >
              yeristech@gmail.com
            </a>
          </div>
          <div>
            <Kicker className="mb-2">Phone</Kicker>
            <a
              href="tel:+13054177464"
              className="text-base text-(--color-fg) hover:text-(--color-accent) transition-colors"
            >
              (305) 417-7464
            </a>
          </div>
          <div>
            <Kicker className="mb-2">Location</Kicker>
            <p className="text-base text-(--color-muted)">
              Florida, USA · Working with clients worldwide
            </p>
          </div>
          <div>
            <Kicker className="mb-2">Response time</Kicker>
            <p className="text-base text-(--color-muted)">
              Within one business day — usually same day.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
