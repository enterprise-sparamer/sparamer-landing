import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sparamer — Engenharia de processos, integrações e automação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, mirrored from app/globals.css :root.
const CREAM = "#F5F1E8";
const INK = "#1A1A1A";
const INK_55 = "rgba(26, 26, 26, 0.55)";
const INK_15 = "rgba(26, 26, 26, 0.15)";
const MOSTARDA = "#C9A227";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: CREAM,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_55,
          }}
        >
          <span>sparamer.com</span>
          <span>São Paulo · BR</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 500,
              maxWidth: 980,
            }}
          >
            Engenharia de processos,
            <br />
            integrações e automação.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 26,
              lineHeight: 1.45,
              color: INK_55,
              maxWidth: 880,
            }}
          >
            Conectamos sistemas, eliminamos tarefas manuais e devolvemos horas
            ao negócio — com código rodando em produção.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${INK_15}`,
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: "-0.005em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 18,
                height: 18,
                background: MOSTARDA,
                marginRight: 14,
              }}
            />
            <span style={{ fontWeight: 500 }}>Sparamer</span>
          </div>
          <span style={{ color: INK_55 }}>zoho · discord · stripe · make · n8n</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
