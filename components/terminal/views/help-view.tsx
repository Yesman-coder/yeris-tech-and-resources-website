import { CATEGORIES_EN, CATEGORIES_ES } from "./help-const";

interface HelpViewProps {
  lang: "en" | "es";
  onCommand: (cmd: string) => void;
}

interface Command {
  cmd: string;
  desc: string;
}

export interface Category {
  title: string;
  color: string;
  commands: Command[];
}

export function HelpView({ lang, onCommand }: HelpViewProps) {
  const categories = lang === "en" ? CATEGORIES_EN : CATEGORIES_ES;

  return (
    <div
      style={{ position: "relative", paddingBottom: "20px" }}
      className="px-4 pt-5 md:px-0"
    >
      <div
        style={{
          position: "sticky",
          top: "-1px",
          background: "#050505",
          padding: "10px 0 20px 0",
          zIndex: 100,
        }}
      >
        <div className="t-section-title">
          {lang === "en" ? "COMMANDS" : "COMANDOS"}
        </div>
        <div className="t-section-sub" style={{ marginBottom: "0" }}>
          {lang === "en"
            ? "// Tab to autocomplete  ·  ↑↓ for command history  ·  click to run"
            : "// Tab para autocompletar  ·  ↑↓ para historial  ·  clic para ejecutar"}
          <br />
          {lang === "en"
            ? "// yeristech.com — hack product building with us"
            : "// yeristech.com — hackeá la construcción de producto con nosotros"}
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat.title} style={{ marginBottom: "8px" }}>
          {/* Category header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 0 8px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.15em",
                color: cat.color,
                opacity: 0.9,
              }}
            >
              {cat.title}
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: cat.color,
                opacity: 0.15,
              }}
            />
          </div>

          {/* Commands */}
          {cat.commands.map(({ cmd, desc }) => (
            <div
              key={cmd}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                padding: "6px 0",
                borderBottom: "1px solid #0a1a0d",
              }}
            >
              <button
                onClick={() => onCommand(cmd)}
                style={{
                  color: cat.color,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "13px",
                  fontWeight: "700",
                  minWidth: "110px",
                  textAlign: "left",
                  padding: 0,
                  textShadow: `0 0 6px ${cat.color}4d`,
                  transition: "text-shadow 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.textShadow =
                    `0 0 14px ${cat.color}e6`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.textShadow =
                    `0 0 6px ${cat.color}4d`;
                }}
              >
                {cmd}
              </button>
              <span className="t-gray" style={{ fontSize: "12px" }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
