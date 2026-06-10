import { ResponseLine } from "./useTerminal";

export type Lang = "en" | "es";

export type Commands =
  | "/home"
  | "/work"
  | "/about"
  | "/services"
  | "/contact"
  | "/runner"
  | "/help"
  | "/snake"
  | "/wordle"
  | "/ping"
  | "/rps"
  | "/whoami"
  | "/weather"
  | "/uptime"
  | "/date"
  | "/coffee"
  | "/confetti"
  | "/matrix"
  | "/mode"
  | "/mode light"
  | "/mode dark"
  | "/flip"
  | "/inspire"
  | "/time-travel"
  | "/sudo"
  | "/bugs"
  | "/deploy"
  | "/git-blame"
  | "/lang"
  | "/lang en"
  | "/lang es"
  | "/clear"
  | "/gravity"
  | "/hello"
  | "/tutorial"
  | "/3dmodel"
  | "/cowsay";

export const CMD_LIST = [
  "/home",
  "/work",
  "/about",
  "/services",
  "/contact",
  "/runner",
  "/help",
  "/snake",
  "/wordle",
  "/ping",
  "/rps",
  "/whoami",
  "/weather",
  "/uptime",
  "/date",
  "/coffee",
  "/confetti",
  "/matrix",
  "/mode",
  "/mode light",
  "/mode dark",
  "/flip",
  "/inspire",
  "/time-travel",
  "/sudo",
  "/bugs",
  "/deploy",
  "/git-blame",
  "/lang",
  "/lang en",
  "/lang es",
  "/clear",
  "/gravity",
  "/hello",
  "/tutorial",
  "/3dmodel",
];

export type View =
  | "boot"
  | "help"
  | "work"
  | "about"
  | "services"
  | "contact"
  | "runner"
  | "snake"
  | "wordle"
  | "ping"
  | "matrix"
  | "gravity"
  | "model";

export const CMD_TO_VIEW: Record<string, View> = {
  "/home": "boot",
  "/work": "work",
  "/about": "about",
  "/services": "services",
  "/contact": "contact",
  "/hire": "contact",
  "/runner": "runner",
  "/snake": "snake",
  "/wordle": "wordle",
  "/ping": "ping",
  "/help": "help",
  "/matrix": "matrix",
  "/gravity": "gravity",
  "/3dmodel": "model",
};
export const CM_WEBSITE_VIEWS: string[] = [
  "/work",
  "/about",
  "/services",
  "/contact",
];

export const WEBSITE_VIEWS = new Set<View>([
  "work",
  "about",
  "services",
  "contact",
]);

// ── Mobile slide behaviour ───────────────────────────────────────────────────
// "stay"       → terminal slides in and stays visible after the command runs
// "slide-back" → terminal slides in, then auto-closes once onComplete fires
// "skip"       → terminal does NOT slide in (silent / side-effect only)
// Any command not listed here defaults to "stay".
export type MobileSlide = "stay" | "slide-back" | "skip" | "slide-in";

export const CMD_MOBILE_SLIDE: Record<Commands, MobileSlide[]> = {
  "/home": ["slide-back", "slide-in"],
  "/work": ["slide-back", "slide-in"],
  "/about": ["slide-back", "slide-in"],
  "/services": ["slide-back", "slide-in"],
  "/contact": ["slide-back", "slide-in"],
  "/runner": ["slide-back", "slide-in"],
  "/help": ["slide-back", "slide-in"],
  "/snake": ["slide-back", "slide-in"],
  "/wordle": ["slide-back", "slide-in"],
  "/ping": ["slide-back", "slide-in"],
  "/rps": ["slide-back", "slide-in"],
  "/whoami": ["stay", "slide-in"],
  "/weather": ["stay", "slide-in"],
  "/uptime": ["stay", "slide-in"],
  "/date": ["stay", "slide-in"],
  "/coffee": ["stay", "slide-in"],
  "/confetti": ["slide-back", "slide-in"],
  "/matrix": ["slide-back", "slide-in"],
  "/mode": ["slide-back", "slide-in"],
  "/mode light": ["slide-back", "slide-in"],
  "/mode dark": ["slide-back", "slide-in"],
  "/flip": ["slide-back", "slide-in"],
  "/inspire": ["stay", "slide-in"],
  "/time-travel": ["stay", "slide-in"],
  "/sudo": ["stay", "slide-in"],
  "/bugs": ["slide-back", "slide-in"],
  "/deploy": ["stay", "slide-in"],
  "/git-blame": ["stay", "slide-in"],
  "/lang": ["skip"],
  "/lang en": ["skip"],
  "/lang es": ["skip"],
  "/clear": ["stay", "slide-in"],
  "/gravity": ["slide-back", "slide-in"],
  "/hello": ["slide-back", "slide-in"],
  "/tutorial": ["slide-back", "slide-in"],
  "/3dmodel": ["slide-back", "slide-in"],
  "/cowsay": ["stay", "slide-in"],
};

const COMMAND_WITH_TEXT = ["/cowsay"];

export const decideSlide = (
  cmd: Commands,
  action: "in" | "out",
): boolean | undefined => {
  let slidesArray = [];
  const splitCommandText = cmd.split(" ");
  if (
    COMMAND_WITH_TEXT.includes(splitCommandText[0]) &&
    splitCommandText.length > 1
  ) {
    slidesArray = CMD_MOBILE_SLIDE[splitCommandText[0] as Commands];
  } else {
    slidesArray = CMD_MOBILE_SLIDE[cmd];
  }

  if (slidesArray.includes("slide-in") && action === "in") {
    return true;
  }
  if (slidesArray.includes("skip") && action === "in") {
    return false;
  }
  if (slidesArray.includes("slide-back") && action === "out") {
    return false;
  }
  if (slidesArray.includes("stay") && action === "out") {
    return true;
  }
  return undefined;
};

export const commands: Record<string, Record<Lang, ResponseLine[]>> = {
  "/home": {
    en: [{ type: "text", content: "// returning home..." }],
    es: [{ type: "text", content: "// volviendo al inicio..." }],
  },
  "/work": {
    en: [
      { type: "text", content: "// loading portfolio..." },
      { type: "download", label: "projects", delay: 300, duration: 1500 },
      { type: "plain", content: "// portfolio ready", delay: 300 },
    ],
    es: [
      { type: "text", content: "// cargando portafolio..." },
      { type: "download", label: "proyectos", delay: 300, duration: 1500 },
      { type: "plain", content: "// portafolio listo", delay: 300 },
    ],
  },
  "/about": {
    en: [
      { type: "text", content: "// fetching team data..." },
      { type: "download", label: "profiles", delay: 300, duration: 1500 },
      { type: "plain", content: "// team loaded", delay: 300 },
    ],
    es: [
      { type: "text", content: "// obteniendo datos del equipo..." },
      { type: "download", label: "perfiles", delay: 300, duration: 1500 },
      { type: "plain", content: "// equipo cargado", delay: 300 },
    ],
  },
  "/services": {
    en: [
      { type: "text", content: "// listing capabilities..." },
      { type: "download", label: "services", delay: 300, duration: 1200 },
      { type: "download", label: "assets", delay: 300, duration: 1200 },
      { type: "plain", content: "// capabilities listed", delay: 300 },
    ],
    es: [
      { type: "text", content: "// listando capacidades..." },
      { type: "download", label: "servicios", delay: 300, duration: 1200 },
      { type: "download", label: "media", delay: 300, duration: 1200 },
      { type: "plain", content: "// capacidades listadas", delay: 300 },
    ],
  },
  "/lab": {
    en: [
      { type: "text", content: "// accessing experimental projects..." },
      { type: "download", label: "experiments", delay: 300, duration: 2500 },
      { type: "plain", content: "// lab access granted", delay: 300 },
    ],
    es: [
      { type: "text", content: "// accediendo proyectos experimentales..." },
      { type: "download", label: "experimentos", delay: 300, duration: 2500 },
      { type: "plain", content: "// acceso al lab concedido", delay: 300 },
    ],
  },
  "/contact": {
    en: [
      { type: "text", content: "// opening communication channel..." },
      { type: "download", label: "channel", delay: 300, duration: 1000 },
      { type: "plain", content: "// channel open", delay: 300 },
    ],
    es: [
      { type: "text", content: "// abriendo canal de comunicación..." },
      { type: "download", label: "canal", delay: 300, duration: 1000 },
      { type: "plain", content: "// canal abierto", delay: 300 },
    ],
  },
  "/start-project": {
    en: [
      { type: "text", content: "// opening communication channel..." },
      { type: "download", label: "channel", delay: 300, duration: 1000 },
      { type: "plain", content: "// channel open", delay: 300 },
    ],
    es: [
      { type: "text", content: "// abriendo canal de comunicación..." },
      { type: "download", label: "canal", delay: 300, duration: 1000 },
      { type: "plain", content: "// canal abierto", delay: 300 },
    ],
  },
  "/hire": {
    en: [
      { type: "text", content: "// opening communication channel..." },
      { type: "download", label: "channel", delay: 300, duration: 1000 },
      { type: "plain", content: "// channel open", delay: 300 },
    ],
    es: [
      { type: "text", content: "// abriendo canal de comunicación..." },
      { type: "download", label: "canal", delay: 300, duration: 1000 },
      { type: "plain", content: "// canal abierto", delay: 300 },
    ],
  },
  "/ping": {
    en: [
      { type: "text", content: "// pinging remote servers..." },
      { type: "download", label: "routing table", delay: 300, duration: 1400 },
      { type: "plain", content: "// connection established", delay: 300 },
    ],
    es: [
      { type: "text", content: "// haciendo ping a los servidores..." },
      { type: "download", label: "tabla de rutas", delay: 300, duration: 1400 },
      { type: "plain", content: "// conexión establecida", delay: 300 },
    ],
  },
  "/wordle": {
    en: [
      { type: "text", content: "// loading wordle components..." },
      { type: "download", label: "word bank", delay: 300, duration: 1000 },
      { type: "plain", content: "// good luck — you have 6 tries", delay: 300 },
    ],
    es: [
      { type: "text", content: "// cargando componentes de wordle..." },
      {
        type: "download",
        label: "banco de palabras",
        delay: 300,
        duration: 1000,
      },
      {
        type: "plain",
        content: "// buena suerte — tienes 6 intentos",
        delay: 300,
      },
    ],
  },
  "/snake": {
    en: [
      { type: "text", content: "// booting Yeris Snake..." },
      { type: "download", label: "game engine", delay: 300, duration: 1200 },
      {
        type: "plain",
        content: "// eat bugs. ship features. don't crash.",
        delay: 300,
      },
    ],
    es: [
      { type: "text", content: "// iniciando Yeris Snake..." },
      { type: "download", label: "motor de juego", delay: 300, duration: 1200 },
      {
        type: "plain",
        content: "// come bugs. lanza features. no te choquees.",
        delay: 300,
      },
    ],
  },
  "/runner": {
    en: [
      { type: "text", content: "// launching Yeris Runner..." },
      { type: "download", label: "game assets", delay: 300, duration: 1500 },
      { type: "plain", content: "// ready — good luck", delay: 300 },
    ],
    es: [
      { type: "text", content: "// iniciando Yeris Runner..." },
      {
        type: "download",
        label: "assets del juego",
        delay: 300,
        duration: 1500,
      },
      { type: "plain", content: "// listo — buena suerte", delay: 300 },
    ],
  },
  "/estimator": {
    en: [
      { type: "text", content: "// loading cost estimator..." },
      { type: "download", label: "modules", delay: 300, duration: 1500 },
      { type: "plain", content: "// estimator ready", delay: 300 },
    ],
    es: [
      { type: "text", content: "// cargando estimador de costos..." },
      { type: "download", label: "módulos", delay: 300, duration: 1500 },
      { type: "plain", content: "// estimador listo", delay: 300 },
    ],
  },
  "/help": {
    en: [
      { type: "text", content: "// listing available commands..." },
      { type: "plain", content: "// done", delay: 300 },
    ],
    es: [
      { type: "text", content: "// listando comandos disponibles..." },
      { type: "plain", content: "// listo", delay: 300 },
    ],
  },
  "/matrix": {
    en: [
      { type: "text", content: "// initializing simulation..." },
      { type: "download", label: "neural link", delay: 300, duration: 1000 },
      { type: "plain", content: "// welcome to the matrix", delay: 300 },
    ],
    es: [
      { type: "text", content: "// inicializando simulación..." },
      { type: "download", label: "enlace neural", delay: 300, duration: 1000 },
      { type: "plain", content: "// bienvenido a la matrix", delay: 300 },
    ],
  },
  "/3dmodel": {
    en: [
      { type: "text", content: "// initializing 3d viewer..." },
      { type: "download", label: "three.js", delay: 200, duration: 1200 },
      { type: "download", label: "pc.glb", delay: 200, duration: 1800 },
      {
        type: "plain",
        content: "// drag to rotate · scroll to zoom",
        delay: 200,
      },
    ],
    es: [
      { type: "text", content: "// iniciando visor 3d..." },
      { type: "download", label: "three.js", delay: 200, duration: 1200 },
      { type: "download", label: "pc.glb", delay: 200, duration: 1800 },
      {
        type: "plain",
        content: "// arrastra para rotar · scroll para zoom",
        delay: 200,
      },
    ],
  },
  "/gravity": {
    en: [
      { type: "text", content: "// loading physics engine..." },
      { type: "download", label: "matter.js", delay: 200, duration: 1000 },
      {
        type: "plain",
        content: "// gravity: enabled. click to spawn, drag to throw.",
        delay: 200,
      },
    ],
    es: [
      { type: "text", content: "// cargando motor de física..." },
      { type: "download", label: "matter.js", delay: 200, duration: 1000 },
      {
        type: "plain",
        content:
          "// gravedad: activada. click para crear, arrastra para lanzar.",
        delay: 200,
      },
    ],
  },
  "/coffee": {
    en: [
      { type: "text", content: "// brewing your coffee..." },
      { type: "download", label: "brewing", delay: 300, duration: 2500 },
      { type: "plain", content: "// Brewing... still thinking...", delay: 300 },
      { type: "ascii", art: "coffee", delay: 200 },
    ],
    es: [
      { type: "text", content: "// preparando tu café..." },
      { type: "download", label: "preparando", delay: 300, duration: 2500 },
      {
        type: "plain",
        content: "// Preparando... todavía le falta...",
        delay: 300,
      },
      { type: "ascii", art: "coffee", delay: 200 },
    ],
  },
  "/cowsay": {
    en: [
      { type: "text", content: "// preparing your cow ..." },
      {
        type: "download",
        label: "waiting for cow",
        delay: 300,
        duration: 2500,
      },
    ],
    es: [
      { type: "text", content: "// preparando tu vaca ..." },
      { type: "download", label: "esperando vaca", delay: 300, duration: 2500 },
    ],
  },
  "/confetti": {
    en: [
      { type: "text", content: "// initiating celebration protocol..." },
      { type: "download", label: "confetti", delay: 300, duration: 800 },
      { type: "plain", content: "// 🎉 boom", delay: 300 },
    ],
    es: [
      { type: "text", content: "// iniciando protocolo de celebración..." },
      { type: "download", label: "confeti", delay: 300, duration: 800 },
      { type: "plain", content: "// 🎉 boom", delay: 300 },
    ],
  },
};
