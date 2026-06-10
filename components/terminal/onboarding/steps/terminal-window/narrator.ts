// ─────────────────────────────────────────────────────────────────────────────
// Narrator content
// ─────────────────────────────────────────────────────────────────────────────
export const NARRATOR = {
  en: {
    intro: [
      "// this is the terminal",
      "// here you can control the entire website",
      "// lets begin with a simple request",
      'enter the command "/coffee" in the input below',
    ],
    afterCoffee: [
      "// great — you just used the terminal",
      "// you are one step closer to the developer experience",
      "// now lets try another one ",
      'enter the command "/inspire"',
    ],
    rightText:
      "This is your terminal. You just enter a command and something happens like magic. Developers use tools like this every day. Now you too.",
    windowIntro: [
      "THIS IS YOUR RENDER WINDOW",
      "Here is where the results appear. Type a command on the left — see it render on the right.",
      "Left talks. Right shows.",
      'Lets test this — enter the command "/matrix"',
    ],
    afterMatrix: [
      "Developers have two screens",
      "One where they write. One where they see the result.",
      "We gave you the same thing. Left side: you write. Right side: you see the results",
    ],
    placeholder: "type a command...",
    loading: "...",
    next: "next ──▶",
  },
  es: {
    intro: [
      "// esta es la terminal",
      "// aquí puedes controlar todo el sitio web",
      "// empecemos con algo simple",
      "escribe el comando /coffee en el campo de abajo",
    ],
    afterCoffee: [
      "// excelente — acabas de usar la terminal",
      "// estás un paso más cerca a la experiencia de desarrollador",
      "// probemos otro — escribe el comando /inspire",
    ],
    rightText:
      "Esta es tu terminal. Los desarrolladores usan herramientas como esta cada día. Ahora tú también.",
    windowIntro: [
      "ESTA ES TU VENETANA DE RENDERIZADO",
      "Aquí es donde aparecen los resultados. Escribe un comando a la izquierda — y lo ves renderizarse a la derecha.",
      "La izquierda habla. La derecha muestra.",
      "Probemos esto — escribe el comando /matrix",
    ],
    afterMatrix: [
      "Los desarrolladores tienen dos pantallas",
      "Una donde escriben. Otra donde ven el resultado.",
      "Te estamos dando lo mismo. Izquierda: escribes. Derecha: ves los resultados.",
    ],
    placeholder: "escribe un comando...",
    loading: "...",
    next: "siguiente ──▶",
  },
} as const;
