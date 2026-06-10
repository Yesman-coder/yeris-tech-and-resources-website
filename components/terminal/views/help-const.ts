import { Category } from "./help-view";

export const CATEGORIES_EN: Category[] = [
  {
    title: "GLOBAL",
    color: "#00ff41",
    commands: [
      { cmd: "/home", desc: "Return to the home screen" },
      { cmd: "/work", desc: "View our portfolio — 9 projects shipped" },
      { cmd: "/about", desc: "Who we are and what drives us" },
      { cmd: "/services", desc: "What we build for you" },
      { cmd: "/contact", desc: "Open a project with us" },
      { cmd: "/lang", desc: "Toggle language (EN ↔ ES)" },
      {
        cmd: "/mode",
        desc: "Switch page theme — only works inside a page view",
      },
      { cmd: "/tutorial", desc: "Restart the tutorial" },
      { cmd: "/help", desc: "Show this menu" },
      { cmd: "/clear", desc: "Clear terminal history" },
    ],
  },
  {
    title: "CODE",
    color: "#00bfff",
    commands: [
      {
        cmd: "/whoami",
        desc: "Browser, OS, screen, time — the terminal knows you",
      },
      {
        cmd: "/weather",
        desc: "Live weather for your location — real API call",
      },
      { cmd: "/uptime", desc: "How long you've been on this site" },
      { cmd: "/date", desc: "Current datetime in ISO format" },
      {
        cmd: "/ping",
        desc: "Check network latency — very useful, highly recommended 🕺",
      },
      { cmd: "/sudo", desc: "Gain superuser access — yes, even root" },
      { cmd: "/deploy", desc: "Push straight to production — think twice" },
      {
        cmd: "/git-blame",
        desc: "Find out who broke it — (spoiler: it was you)",
      },
      {
        cmd: "/3dmodel",
        desc: "See what we can do with a 3D model",
      },
      {
        cmd: "/gravity",
        desc: "Explore a gravity simulation with real physics",
      },
    ],
  },
  {
    title: "FUN",
    color: "#ffb300",
    commands: [
      { cmd: "/runner", desc: "Play Yeris Runner 🎮" },
      { cmd: "/wordle", desc: "Guess the 5-letter word — 6 tries" },
      { cmd: "/snake", desc: "Eat bugs, features & projects — don't crash 🐍" },
      { cmd: "/rps", desc: "Rock-paper-scissors against the terminal" },
      { cmd: "/coffee", desc: "Brew a cup while you think 🍵" },
      { cmd: "/matrix", desc: "Enter the simulation (type anything to exit)" },
      { cmd: "/confetti", desc: "Launch a celebration 🎉" },
      {
        cmd: "/flip",
        desc: "Flip the render window upside down — /flip again to restore",
      },
      {
        cmd: "/bugs",
        desc: "Release live bugs on screen — click to patch them 🐛",
      },
      {
        cmd: "/time-travel",
        desc: "Jump to any point in time — spacetime clearance required",
      },
      {
        cmd: "/inspire",
        desc: "Dev / Startup / Philosophy quote to inspire you",
      },
      {
        cmd: "/cowsay [text]",
        desc: "A cow says your words — Unix classic 🐄",
      },
    ],
  },
];

export const CATEGORIES_ES: Category[] = [
  {
    title: "GLOBAL",
    color: "#00ff41",
    commands: [
      { cmd: "/home", desc: "Volver a la pantalla de inicio" },
      { cmd: "/work", desc: "Ver portafolio — 9 proyectos enviados" },
      { cmd: "/about", desc: "Quiénes somos y qué nos mueve" },
      { cmd: "/services", desc: "Lo que construimos para ti" },
      { cmd: "/contact", desc: "Abrir un proyecto con nosotros" },
      { cmd: "/lang", desc: "Cambiar idioma (EN ↔ ES)" },
      {
        cmd: "/mode",
        desc: "Cambiar tema de la página — solo funciona en una vista de página",
      },
      { cmd: "/tutorial", desc: "Reiniciar el tutorial" },
      { cmd: "/help", desc: "Mostrar este menú" },
      { cmd: "/clear", desc: "Limpiar historial del terminal" },
    ],
  },
  {
    title: "CODE",
    color: "#00bfff",
    commands: [
      {
        cmd: "/whoami",
        desc: "Navegador, OS, pantalla, hora — el terminal te conoce",
      },
      { cmd: "/weather", desc: "Clima en tiempo real — llamada real a la API" },
      { cmd: "/uptime", desc: "Cuánto tiempo llevas en el sitio" },
      { cmd: "/date", desc: "Fecha y hora actual en formato ISO" },
      {
        cmd: "/ping",
        desc: "Comprueba la latencia de red — muy útil, muy recomendado 🕺",
      },
      { cmd: "/sudo", desc: "Acceso de superusuario — sí, hasta root" },
      {
        cmd: "/deploy",
        desc: "Desplegar directo a producción — piénsalo dos veces",
      },
      {
        cmd: "/git-blame",
        desc: "Descubre quién lo rompió — (spoiler: fuiste tú)",
      },
      {
        cmd: "/3dmodel",
        desc: "Ve lo que podemos hacer con un modelo 3D",
      },
      {
        cmd: "/gravity",
        desc: "Explorar una simulación de gravedad con física real",
      },
    ],
  },
  {
    title: "FUN",
    color: "#ffb300",
    commands: [
      { cmd: "/runner", desc: "Jugar Yeris Runner 🎮" },
      { cmd: "/wordle", desc: "Adivina la palabra de 5 letras — 6 intentos" },
      {
        cmd: "/snake",
        desc: "Come bugs, features y proyectos — no te choquees 🐍",
      },
      { cmd: "/rps", desc: "Piedra-papel-tijeras contra el terminal" },
      { cmd: "/coffee", desc: "Prepara un café mientras piensas 🍵" },
      {
        cmd: "/matrix",
        desc: "Entrar a la simulación (escribe algo para salir)",
      },
      { cmd: "/confetti", desc: "Lanzar una celebración 🎉" },
      {
        cmd: "/flip",
        desc: "Voltear la ventana al revés — /flip de nuevo para restaurar",
      },
      {
        cmd: "/bugs",
        desc: "Suelta bugs en vivo en pantalla — clic para parchearlos 🐛",
      },
      {
        cmd: "/time-travel",
        desc: "Salta a cualquier momento — requiere autorización espacio-temporal",
      },
      {
        cmd: "/inspire",
        desc: "Frase aleatoria de Dev / Startup / filosofía para inspirarte",
      },
      {
        cmd: "/cowsay [texto]",
        desc: "Una vaca dice lo que escribes — clásico Unix 🐄",
      },
    ],
  },
];
