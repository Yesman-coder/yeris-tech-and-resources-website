"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const RESPONSES_EN = [
  "hello human. please don't close the tab.",
  "oh hey. didn't see you there. (i always see you)",
  "greetings, carbon-based life form.",
  "hello. i was waiting for someone to type that.",
  "hi! you are visitor #1 today. and yesterday. and every day.",
  "hey. don't tell the other commands but you're my favorite.",
  "hello! i'd offer you a coffee but /coffee exists for that.",
  "yo. bold move typing /hello on a stranger's terminal.",
  "good [time of day]. i don't actually know what time it is. try /date.",
  "well well well. look who showed up.",
  "hello! warning: this terminal does not validate feelings. only commands.",
  "hi there. i'm doing fine. nobody ever asks but it means a lot.",
];

const RESPONSES_ES = [
  "hola humano. por favor no cierres la pestaña.",
  "oh hola. no te vi llegar. (siempre te veo)",
  "saludos, forma de vida a base de carbono.",
  "hola. estaba esperando que alguien escribiera eso.",
  "¡hola! eres el visitante #1 hoy. y ayer. y todos los días.",
  "hey. no le digas a los otros comandos pero eres mi favorito.",
  "¡hola! te ofrecería un café pero para eso existe /coffee.",
  "ey. qué valiente escribir /hello en la terminal de un extraño.",
  "buenos [hora del día]. en realidad no sé qué hora es. prueba /date.",
  "vaya vaya vaya. mira quién apareció.",
  "¡hola! advertencia: esta terminal no valida sentimientos. solo comandos.",
  "hola. yo bien. nadie pregunta nunca pero se agradece mucho.",
];

const useHello = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction) => {
    const pool = lang === "en" ? RESPONSES_EN : RESPONSES_ES;
    const line = pool[Math.floor(Math.random() * pool.length)];
    const response: ResponseLine[] = [
      { type: "text", content: `// ${line}`, color: "#00ff41" },
    ];
    setHistory((h) => [...h, { id, input: cmd, response }]);
  };
  return execute;
};

export default useHello;
