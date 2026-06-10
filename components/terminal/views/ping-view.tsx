"use client";

import { useLanguage } from "@/components/language-provider";
import React from "react";

interface PingViewProps {
  onCommand: (cmd: string) => void;
}

export const PingView: React.FC<PingViewProps> = ({ onCommand }) => {
  const { t } = useLanguage();
  return (
    <div>
      <video
        src="/videos/rickroll.mp4"
        autoPlay
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
        }}
      />
      <div
        className="t-section-title"
        style={{
          padding: "20px 10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ textAlign: "center", wordBreak: "break-word" }}>
          {"PING ... PING ... PING ... PING ... "}
          <br></br>
          {t("Te acaban de rickrollear 🍩", "You just got rickrolled 🍩")}
        </p>
        <button
          style={{
            textAlign: "center",
            wordBreak: "break-word",
            paddingTop: "10px",
            cursor: "pointer",
            textShadow: "0 0 6px rgba(0,255,65,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.textShadow =
              "0 0 14px rgba(0,255,65,0.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.textShadow =
              "0 0 6px rgba(0,255,65,0.3)";
          }}
          onClick={() => onCommand("/help")}
        >
          {"👋 /help"}
        </button>
      </div>
    </div>
  );
};
