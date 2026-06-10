// ASCII art renderers — add new ones here and they become available
// to ResponseLine { type: "ascii", art: "<key>", extra: "..." }

const MAX_LINE = 36;

function speechBubble(text: string): string[] {
  const words = (text || "...").split(/\s+/);
  const lines: string[] = [];
  let cur = "";

  for (const w of words) {
    if (!cur) { cur = w; continue; }
    if (cur.length + 1 + w.length <= MAX_LINE) {
      cur += " " + w;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (!lines.length) lines.push("...");

  const width = Math.max(...lines.map((l) => l.length));
  const bar = "-".repeat(width + 2);
  const rows: string[] = [` ${bar}`];

  if (lines.length === 1) {
    rows.push(`< ${lines[0].padEnd(width)} >`);
  } else {
    lines.forEach((line, i) => {
      const s = line.padEnd(width);
      if (i === 0)                      rows.push(`/ ${s} \\`);
      else if (i === lines.length - 1)  rows.push(`\\ ${s} /`);
      else                              rows.push(`| ${s} |`);
    });
  }

  rows.push(` ${bar}`);
  return rows;
}

export function cowsay(text?: string): string {
  return [
    ...speechBubble(text ?? "..."),
    `        \\   ^__^`,
    `         \\  (oo)\\_______`,
    `            (__)\\       )\\/\\`,
    `                ||----w |`,
    `                ||     ||`,
  ].join("\n");
}

export function coffee(): string {
  return [
    `    ) ) )`,
    `   ( ( (`,
    `  .-------.`,
    `  |       |]`,
    `  |  c[]  |]`,
    `  |       |`,
    `  \`-------'`,
  ].join("\n");
}

// Registry — art name → render function
export const ASCII_ART: Record<string, (extra?: string) => string> = {
  cow: cowsay,
  coffee: () => coffee(),
};
