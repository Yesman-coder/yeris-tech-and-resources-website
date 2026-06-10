"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useInspire = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const FORTUNES_EN = [
      ["Move fast and break things.", "— Mark Zuckerberg, 2006"],
      ["Make something people want.", "— Paul Graham, YC motto"],
      ["Done is better than perfect.", "— Sheryl Sandberg"],
      [
        "If you're not embarrassed by your first version, you launched too late.",
        "— Reid Hoffman",
      ],
      ["The best way to predict the future is to invent it.", "— Alan Kay"],
      ["Simplicity is the ultimate sophistication.", "— Leonardo da Vinci"],
      [
        "Any application that can be written in JavaScript will eventually be written in JavaScript.",
        "— Atwood's Law",
      ],
      ["Talk is cheap. Show me the code.", "— Linus Torvalds"],
      [
        "Code is like humor. When you have to explain it, it's bad.",
        "— Cory House",
      ],
      ["First, solve the problem. Then, write the code.", "— John Johnson"],
      [
        "You can't connect the dots looking forward; you can only connect them looking backwards.",
        "— Steve Jobs",
      ],
      [
        "The most dangerous phrase in the language is 'we've always done it this way.'",
        "— Grace Hopper",
      ],
      ["It's not a bug — it's an undocumented feature.", "— Unknown"],
      ["Weeks of coding can save you hours of planning.", "— Unknown"],
      ["The best code is no code at all.", "— Jeff Atwood"],
      [
        "Programs must be written for people to read, and only incidentally for machines to execute.",
        "— Harold Abelson",
      ],
      [
        "A ship in harbor is safe, but that's not what ships are for.",
        "— John A. Shedd",
      ],
      [
        "Working software is the primary measure of progress.",
        "— Agile Manifesto",
      ],
      ["The secret to getting ahead is getting started.", "— Mark Twain"],
    ];
    const FORTUNES_ES = [
      ["Muévete rápido y rompe cosas.", "— Mark Zuckerberg, 2006"],
      ["Haz algo que la gente quiera.", "— Paul Graham, lema de YC"],
      ["Hecho es mejor que perfecto.", "— Sheryl Sandberg"],
      [
        "Si no te da vergüenza la primera versión, lanzaste demasiado tarde.",
        "— Reid Hoffman",
      ],
      ["La mejor forma de predecir el futuro es inventarlo.", "— Alan Kay"],
      ["La simplicidad es la máxima sofisticación.", "— Leonardo da Vinci"],
      [
        "Cualquier app que pueda escribirse en JavaScript, eventualmente se escribirá en JavaScript.",
        "— Ley de Atwood",
      ],
      ["El hablar es barato. Muéstrame el código.", "— Linus Torvalds"],
      [
        "El código es como el humor: si lo tienes que explicar, es malo.",
        "— Cory House",
      ],
      [
        "Primero resuelve el problema. Luego escribe el código.",
        "— John Johnson",
      ],
      [
        "No puedes conectar los puntos mirando hacia adelante; solo puedes conectarlos mirando hacia atrás.",
        "— Steve Jobs",
      ],
      [
        "La frase más peligrosa en el idioma es 'siempre lo hemos hecho así.'",
        "— Grace Hopper",
      ],
      ["No es un bug — es una característica no documentada.", "— Desconocido"],
      [
        "Semanas de código pueden ahorrarte horas de planificación.",
        "— Desconocido",
      ],
      ["El mejor código es ningún código.", "— Jeff Atwood"],
      [
        "Los programas deben escribirse para que la gente los lea, y solo incidentalmente para que las máquinas los ejecuten.",
        "— Harold Abelson",
      ],
      [
        "Un barco en el puerto está a salvo, pero para eso no están los barcos.",
        "— John A. Shedd",
      ],
      [
        "El software funcionando es la medida principal del progreso.",
        "— Manifiesto Ágil",
      ],
      ["El secreto para avanzar es empezar.", "— Mark Twain"],
    ];
    const pool = lang === "en" ? FORTUNES_EN : FORTUNES_ES;
    const [quote, attribution] = pool[Math.floor(Math.random() * pool.length)];
    const response: ResponseLine[] = [
      {
        type: "text",
        content: "  ─────────────────────────",
        color: "#006620",
      },
      { type: "text", content: `  "${quote}"`, color: "#00ff41" },
      {
        type: "text",
        content: `  ${attribution}`,
        delay: 150,
        color: "#004d13",
      },
      {
        type: "text",
        content: "  ─────────────────────────",
        color: "#006620",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response }]);
    return;
  };
  return execute;
};

export default useInspire;
