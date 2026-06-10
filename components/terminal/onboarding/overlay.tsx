"use client";
import { SetStateAction, useEffect, useState } from "react";
import { StepIntro } from "./steps/step-intro";
import { StepGap } from "./steps/gap/step-gap";
import { StepGapMobile } from "./steps/gap/step-gap-mobile";
import { StepTerminal } from "./steps/terminal-window/step-terminal-window";
import { StepOutro } from "./steps/step-outro";
import useMobile from "@/hooks/useMobile";

interface OnboardingOverlayProps {
  lang: "en" | "es";
  onDismiss: () => void;
  onStepChange?: (step: number) => void;
  initialStep?: number;
  setLang: (v: SetStateAction<"en" | "es">) => void;
}

export const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({
  lang,
  onDismiss,
  onStepChange,
  initialStep = 1,
  setLang,
}) => {
  const isMobile = useMobile();
  const [step, setStep] = useState(initialStep);

  const setOnboardingLang = (v: SetStateAction<"en" | "es">) => setLang(v);

  useEffect(() => {
    if (!localStorage.getItem("yeristech-visited")) {
      const saved = localStorage.getItem("yeristech-onboarding-step");
      if (saved) setStep(Number(saved));
    }
  }, []);

  const handleNext = (nextStep: number) => {
    setStep(nextStep);
    localStorage.setItem("yeristech-onboarding-step", String(nextStep));
    onStepChange?.(nextStep);
  };

  return (
    <>
      <div className="onboarding-scrim bg-[#000] h-[100vh] w-full hidden md:block" />
      {step > 1 && (
        <p
          style={{
            marginBottom: "40px",
            fontSize: "18px",
            position: "absolute",
            top: 20,
            left: 20,
            textAlign: "center",
            zIndex: 1050,
            cursor: "pointer",
          }}
          onClick={() => handleNext(step - 1)}
        >
          {lang === "en" ? "< STEP BACK" : "< REGRESAR"}
        </p>
      )}

      {step === 1 && (
        <StepIntro
          lang={lang}
          onLangChange={setOnboardingLang}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <StepTerminal lang={lang} onNext={handleNext} onDismiss={onDismiss} />
      )}

      {step === 3 &&
        (isMobile ? (
          <StepGapMobile lang={lang} onNext={handleNext} />
        ) : (
          <StepGap lang={lang} onNext={handleNext} />
        ))}

      {step === 4 && <StepOutro lang={lang} onDismiss={onDismiss} />}
    </>
  );
};
