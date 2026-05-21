"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  questionEn: string;
  questionEs: string;
  options: {
    labelEn: string;
    labelEs: string;
    value: string;
    multiplier: number;
  }[];
}

const questions: Question[] = [
  {
    id: "projectType",
    questionEn: "What type of project are you building?",
    questionEs: "¿Qué tipo de proyecto quieres construir?",
    options: [
      { labelEn: "Landing page / Marketing site", labelEs: "Landing page / Sitio de marketing", value: "landing", multiplier: 0 },
      { labelEn: "Web application", labelEs: "Aplicación web", value: "webapp", multiplier: 400 },
      { labelEn: "E-commerce store", labelEs: "Tienda de e-commerce", value: "ecommerce", multiplier: 350 },
      { labelEn: "AI automation / Agents", labelEs: "Automatización con IA / Agentes", value: "ai", multiplier: 500 },
      { labelEn: "Mobile app", labelEs: "Aplicación móvil", value: "mobile", multiplier: 600 },
      { labelEn: "Something else", labelEs: "Otro tipo de proyecto", value: "other", multiplier: 300 },
    ],
  },
  {
    id: "complexity",
    questionEn: "How complex is your project?",
    questionEs: "¿Qué tan complejo es tu proyecto?",
    options: [
      { labelEn: "Simple (1-3 pages, basic features)", labelEs: "Simple (1-3 páginas, funciones básicas)", value: "simple", multiplier: 0 },
      { labelEn: "Medium (5-10 pages, user auth, database)", labelEs: "Medio (5-10 páginas, autenticación, base de datos)", value: "medium", multiplier: 300 },
      { labelEn: "Complex (Many features, integrations, admin panel)", labelEs: "Complejo (Muchas funciones, integraciones, panel admin)", value: "complex", multiplier: 600 },
      { labelEn: "Enterprise (Large scale, multiple systems)", labelEs: "Empresarial (Gran escala, múltiples sistemas)", value: "enterprise", multiplier: 900 },
    ],
  },
  {
    id: "design",
    questionEn: "What level of design do you need?",
    questionEs: "¿Qué nivel de diseño necesitas?",
    options: [
      { labelEn: "I have designs ready", labelEs: "Ya tengo diseños listos", value: "ready", multiplier: 0 },
      { labelEn: "Basic / Template-based", labelEs: "Básico / Basado en plantillas", value: "basic", multiplier: 100 },
      { labelEn: "Custom design", labelEs: "Diseño personalizado", value: "custom", multiplier: 250 },
      { labelEn: "Premium branding + design", labelEs: "Branding premium + diseño", value: "premium", multiplier: 400 },
    ],
  },
  {
    id: "timeline",
    questionEn: "What's your ideal timeline?",
    questionEs: "¿Cuál es tu timeline ideal?",
    options: [
      { labelEn: "ASAP (Rush project)", labelEs: "Lo antes posible (Proyecto urgente)", value: "asap", multiplier: 300 },
      { labelEn: "2-4 weeks", labelEs: "2-4 semanas", value: "fast", multiplier: 150 },
      { labelEn: "1-2 months", labelEs: "1-2 meses", value: "normal", multiplier: 0 },
      { labelEn: "3+ months (flexible)", labelEs: "3+ meses (flexible)", value: "flexible", multiplier: -50 },
    ],
  },
  {
    id: "features",
    questionEn: "Which features do you need?",
    questionEs: "¿Qué características necesitas?",
    options: [
      { labelEn: "User authentication", labelEs: "Autenticación de usuarios", value: "auth", multiplier: 100 },
      { labelEn: "Payment processing", labelEs: "Procesamiento de pagos", value: "payments", multiplier: 150 },
      { labelEn: "Third-party integrations", labelEs: "Integraciones con terceros", value: "integrations", multiplier: 100 },
      { labelEn: "Admin dashboard", labelEs: "Panel de administración", value: "admin", multiplier: 200 },
    ],
  },
];

// Base price for simplest project (landing page, simple, designs ready, normal timeline, no extra features)
const BASE_PRICE = 500;
const MAX_PRICE = 3000;

function calculateEstimate(answers: Record<string, string[]>): { min: number; max: number } {
  let additionalCost = 0;
  
  // Add up all the additional costs from selected options
  Object.entries(answers).forEach(([questionId, selectedValues]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      selectedValues.forEach(value => {
        const option = question.options.find(o => o.value === value);
        if (option) {
          additionalCost += option.multiplier;
        }
      });
    }
  });

  const totalEstimate = BASE_PRICE + additionalCost;
  
  // Cap the price at MAX_PRICE
  const cappedEstimate = Math.min(totalEstimate, MAX_PRICE);
  
  return {
    min: Math.round(cappedEstimate * 0.9 / 50) * 50,
    max: Math.min(Math.round(cappedEstimate * 1.15 / 50) * 50, MAX_PRICE),
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EstimatorPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];
  const isMultiSelect = currentQuestion?.id === "features";
  const selectedValues = answers[currentQuestion?.id] || [];

  const handleSelect = (value: string) => {
    if (isMultiSelect) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedValues.includes(value)
          ? selectedValues.filter(v => v !== value)
          : [...selectedValues, value],
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: [value],
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const estimate = calculateEstimate(answers);

  const handleContinueToContact = () => {
    const projectTypeAnswer = answers.projectType?.[0];
    const projectTypeMap: Record<string, string> = {
      landing: "Website",
      webapp: "Web app",
      ecommerce: "E-commerce",
      ai: "AI agents / automation",
      mobile: "Mobile",
      other: "Something else",
    };
    
    const budgetMap = (min: number): string => {
      if (min < 750) return "< $750";
      if (min < 1500) return "$750–$1,500";
      if (min < 2500) return "$1,500–$2,500";
      return "$2,500–$3,000";
    };

    const summaryParts = Object.entries(answers).map(([qId, values]) => {
      const q = questions.find(q => q.id === qId);
      if (!q) return "";
      const labels = values.map(v => {
        const opt = q.options.find(o => o.value === v);
        return opt?.labelEn || v;
      });
      return `${q.questionEn.replace("?", "")}: ${labels.join(", ")}`;
    });

    const message = `Project Estimator Summary:\n\n${summaryParts.join("\n")}\n\nEstimated Budget: ${formatCurrency(estimate.min)} - ${formatCurrency(estimate.max)}`;
    
    // Store in sessionStorage to prefill contact form
    sessionStorage.setItem("estimatorData", JSON.stringify({
      projectType: projectTypeMap[projectTypeAnswer] || "Something else",
      budget: budgetMap(estimate.min),
      message,
    }));
    
    router.push("/contact?from=estimator");
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full text-center"
        >
          <div className="font-mono text-[11px] text-primary tracking-[0.2em] mb-6">
            {t("ESTIMACIÓN DE PROYECTO", "PROJECT ESTIMATE")}
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            {t("Tu proyecto podría costar", "Your project could cost")}
          </h1>
          
          <div className="my-8">
            <span className="font-serif text-5xl md:text-7xl text-primary">
              {formatCurrency(estimate.min)} – {formatCurrency(estimate.max)}
            </span>
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t(
              "Esta es una estimación basada en tus respuestas. El precio final depende de los detalles específicos de tu proyecto.",
              "This is an estimate based on your answers. The final price depends on the specific details of your project."
            )}
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-medium text-foreground mb-4">
              {t("Resumen de tu proyecto", "Your project summary")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {Object.entries(answers).map(([qId, values]) => {
                const q = questions.find(q => q.id === qId);
                if (!q) return null;
                return (
                  <li key={qId} className="flex justify-between">
                    <span>{t(q.questionEs.replace("?", ""), q.questionEn.replace("?", ""))}:</span>
                    <span className="text-foreground font-medium">
                      {values.map(v => {
                        const opt = q.options.find(o => o.value === v);
                        return t(opt?.labelEs || v, opt?.labelEn || v);
                      }).join(", ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleContinueToContact}
              size="lg"
              className="h-12 rounded-full px-8 bg-primary hover:bg-primary/90"
            >
              {t("Continuar al formulario de contacto", "Continue to contact form")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setAnswers({});
              }}
              variant="ghost"
              size="lg"
              className="h-12 rounded-full px-8"
            >
              {t("Empezar de nuevo", "Start over")}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{t("Pregunta", "Question")} {currentStep + 1} / {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {t(currentQuestion.questionEs, currentQuestion.questionEn)}
            </h1>
            
            {isMultiSelect && (
              <p className="text-sm text-muted-foreground mb-6">
                {t("Selecciona todas las que apliquen", "Select all that apply")}
              </p>
            )}

            <div className="grid gap-3 mt-8">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all duration-200",
                      "hover:border-primary/50 hover:bg-secondary/50",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-base",
                        isSelected ? "text-foreground font-medium" : "text-foreground/80"
                      )}>
                        {t(option.labelEs, option.labelEn)}
                      </span>
                      {isSelected && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Button
            onClick={handleBack}
            variant="ghost"
            disabled={currentStep === 0}
            className="h-12 rounded-full px-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("Anterior", "Back")}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedValues.length === 0}
            className="h-12 rounded-full px-8 bg-primary hover:bg-primary/90"
          >
            {currentStep === questions.length - 1 
              ? t("Ver estimación", "See estimate") 
              : t("Siguiente", "Next")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
