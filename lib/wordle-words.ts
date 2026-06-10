export const WORDS_EN: readonly string[] = [
  "APPLE", "BRAIN", "CHAIR", "DANCE", "EAGLE", "FLAME", "GRACE", "HEART",
  "IMAGE", "JUICE", "KNIFE", "LIGHT", "MUSIC", "NIGHT", "OCEAN", "PLANE",
  "QUEEN", "RIVER", "SHIRT", "TABLE", "UNCLE", "VOICE", "WATER", "YOUTH",
  "ZEBRA", "BENCH", "CLOUD", "DRIVE", "EARTH", "FAITH", "GLOBE", "HOTEL",
  "INDEX", "JEWEL", "KNOCK", "LEMON", "MONEY", "NOISE", "OLIVE", "PEACE",
  "RAISE", "SNAKE", "TIGER", "UNION", "WHITE", "BEACH", "CANDY", "DEVIL",
  "EIGHT", "FIELD", "GIANT", "HAPPY", "KARMA", "LUNAR", "MAGIC", "NOBLE",
  "OPERA", "PIZZA", "RADIO", "SUGAR", "TASTE", "VAULT", "WITCH", "YIELD",
  "BLADE", "CRAFT", "DENSE", "FANCY", "GRAIN", "HONEY", "INPUT", "JOKER",
  "MEDAL", "NERVE", "OUTER", "PAPER", "QUICK", "ROYAL", "SHEEP", "TOWER",
  "URBAN", "BANJO", "CARDS", "DELTA", "FAVOR", "LOYAL", "PILOT", "SOLAR",
  "TRADE", "ULTRA", "VIRAL", "WRIST", "BOXER", "CHEST", "DWARF", "ELITE",
  "GLARE", "HAVOC", "JELLY", "KAYAK",
];

export const WORDS_ES: readonly string[] = [
  "ACTOR", "BANCO", "CAMPO", "DANZA", "ENERO", "FINCA", "GANAS", "HACHA",
  "IDEAS", "JUEGO", "KARMA", "LECHE", "MADRE", "NARIZ", "ORDEN", "PAPEL",
  "QUESO", "RADIO", "SALSA", "TABLA", "VAMOS", "MUNDO", "PERRO", "TECHO",
  "BRAZO", "CARNE", "DATOS", "ERROR", "FAVOR", "GRUPO", "HOTEL", "IGUAL",
  "JOVEN", "LARGO", "MARCO", "NEGRO", "PLAZA", "RELOJ", "SALVO", "TAREA",
  "VALOR", "AVION", "BUQUE", "CABLE", "DIETA", "FRASE", "GLOBO", "HUMOR",
  "ISLAS", "JUSTO", "LANCE", "MEJOR", "NIVEL", "OCASO", "PEINE", "SILLA",
  "TORNO", "VIAJE", "ABEJA", "ABUSO", "ACERO", "ACOSO", "ADOBE", "AGUJA",
  "AHORA", "ALETA", "ALMAS", "ALTOS", "AMBOS", "AMIGO", "ANGEL", "ANTES",
  "APODO", "ARBOL", "ARENA", "AROMA", "ARTES", "ASADO", "ATLAS", "ATRAS",
  "AUDIO", "AVENA", "BELLO", "BESOS", "BLUSA", "BOLSA", "BURLA", "CACAO",
  "CALOR", "CALMA", "CELOS", "CENAR", "CERDO", "CIELO", "CLASE", "CLAVO",
  "COBRO", "COGER", "COLOR", "CORTE",
];

export function getRandomWord(lang: "en" | "es"): string {
  const list = lang === "en" ? WORDS_EN : WORDS_ES;
  return list[Math.floor(Math.random() * list.length)];
}

export function isValidWord(word: string, lang: "en" | "es"): boolean {
  const list = lang === "en" ? WORDS_EN : WORDS_ES;
  return list.includes(word.toUpperCase());
}
