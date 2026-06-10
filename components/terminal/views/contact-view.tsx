"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FORMSPREE_ID = "mdalwjyz";

const schema = z.object({
  name: z.string().min(1, "required"),
  email: z.string().email("invalid email"),
  company: z.string().optional(),
  budget: z.string().min(1, "required"),
  projectType: z.string().min(1, "required"),
  message: z.string().min(20, "min 20 characters"),
});

type FormData = z.infer<typeof schema>;

interface ContactViewProps {
  lang: "en" | "es";
}

export function ContactView({ lang }: ContactViewProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <div className="t-section-title">
          {lang === "en" ? "MESSAGE SENT" : "MENSAJE ENVIADO"}
        </div>
        <hr className="t-divider" />
        <div
          className="t-green"
          style={{ fontSize: "14px", marginBottom: "8px" }}
        >
          {lang === "en"
            ? "// transmission successful."
            : "// transmisión exitosa."}
        </div>
        <p className="t-gray" style={{ fontSize: "13px", lineHeight: "1.7" }}>
          {lang === "en"
            ? "We'll be in touch within one business day. While you wait — type /runner."
            : "Nos pondremos en contacto en un día hábil. Mientras esperas — escribe /runner."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="t-section-title text-primary">
        {lang === "en"
          ? "OPEN A PROJECT CHANNEL"
          : "ABRIR UN CANAL DE PROYECTO"}
      </div>
      <div className="t-section-sub">
        {lang === "en"
          ? "// hack your way to a better product — tell us about it"
          : "// hackea el camino a un mejor producto — cuéntanos"}
      </div>
      <hr className="t-divider" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="t-form"
        noValidate
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div className="t-field">
            <label className="t-label">
              {lang === "en" ? "> Name *" : "> Nombre *"}
            </label>
            <input
              className="t-input"
              {...register("name")}
              placeholder={lang === "en" ? "Your name" : "Tu nombre"}
            />
            {errors.name && (
              <span className="t-field-error">
                {"// " + errors.name.message}
              </span>
            )}
          </div>
          <div className="t-field">
            <label className="t-label">
              {lang === "en" ? "> Email *" : "> Correo *"}
            </label>
            <input
              className="t-input"
              type="email"
              {...register("email")}
              placeholder="you@company.com"
            />
            {errors.email && (
              <span className="t-field-error">
                {"// " + errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="t-field">
          <label className="t-label">
            {lang === "en" ? "> Company" : "> Empresa"}
          </label>
          <input
            className="t-input"
            {...register("company")}
            placeholder={lang === "en" ? "Optional" : "Opcional"}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div className="t-field">
            <label className="t-label">
              {lang === "en" ? "> Budget *" : "> Presupuesto *"}
            </label>
            <select
              className="t-select"
              defaultValue=""
              onChange={(e) => setValue("budget", e.target.value)}
            >
              <option value="" disabled>
                {lang === "en" ? "Select range" : "Seleccionar rango"}
              </option>
              <option value="< $5k">{"< $5k"}</option>
              <option value="$5k–$15k">$5k–$15k</option>
              <option value="$15k–$30k">$15k–$30k</option>
              <option value="$30k–$75k">$30k–$75k</option>
              <option value="$75k+">$75k+</option>
              <option value="Not sure yet">
                {lang === "en" ? "Not sure yet" : "No estoy seguro"}
              </option>
            </select>
            {errors.budget && (
              <span className="t-field-error">{"// required"}</span>
            )}
          </div>
          <div className="t-field">
            <label className="t-label">
              {lang === "en" ? "> Project type *" : "> Tipo de proyecto *"}
            </label>
            <select
              className="t-select"
              defaultValue=""
              onChange={(e) => setValue("projectType", e.target.value)}
            >
              <option value="" disabled>
                {lang === "en" ? "Select type" : "Seleccionar tipo"}
              </option>
              <option value="Website">
                {lang === "en" ? "Website" : "Sitio web"}
              </option>
              <option value="Web app">
                {lang === "en" ? "Web app" : "Aplicación web"}
              </option>
              <option value="AI agents / automation">
                {lang === "en"
                  ? "AI agents / automation"
                  : "Agentes IA / automatización"}
              </option>
              <option value="E-commerce">E-commerce</option>
              <option value="Mobile">
                {lang === "en" ? "Mobile" : "Móvil"}
              </option>
              <option value="Something else">
                {lang === "en" ? "Something else" : "Algo más"}
              </option>
            </select>
            {errors.projectType && (
              <span className="t-field-error">{"// required"}</span>
            )}
          </div>
        </div>

        <div className="t-field">
          <label className="t-label">
            {lang === "en" ? "> Tell us more *" : "> Cuéntanos más *"}
          </label>
          <textarea
            className="t-textarea"
            {...register("message")}
            rows={4}
            placeholder={
              lang === "en"
                ? "What are you building? Timeline? Any details help..."
                : "¿Qué estás construyendo? ¿Cuál es tu plazo? Cualquier detalle ayuda..."
            }
          />
          {errors.message && (
            <span className="t-field-error">
              {"// " + errors.message.message}
            </span>
          )}
        </div>

        <button type="submit" className="t-btn" disabled={isSubmitting}>
          {isSubmitting
            ? lang === "en"
              ? "// sending..."
              : "// enviando..."
            : lang === "en"
              ? "SEND MESSAGE →"
              : "ENVIAR MENSAJE →"}
        </button>
      </form>
    </div>
  );
}
