// Palette — must match :root in app/globals.css exactly.
export const palette = {
  cream:           "#F5F1E8",
  ink:             "#1A1A1A",
  olive:           "#5A6B3A",
  mostarda:        "#C9A227",
  mostardaStrong:  "#8a6e15",
  ceramica:        "#B4503A",
} as const;

export const inkOpacity = {
  70: "rgba(26, 26, 26, 0.70)",
  55: "rgba(26, 26, 26, 0.55)",
  40: "rgba(26, 26, 26, 0.40)",
  15: "rgba(26, 26, 26, 0.15)",
} as const;

// CSS var aliases — prefer these in inline style props.
export const cssVar = {
  cream:           "var(--color-cream)",
  ink:             "var(--color-ink)",
  ink70:           "var(--color-ink-70)",
  ink55:           "var(--color-ink-55)",
  ink40:           "var(--color-ink-40)",
  ink15:           "var(--color-ink-15)",
  olive:           "var(--color-olive)",
  mostarda:        "var(--color-mostarda)",
  mostardaStrong:  "var(--color-mostarda-strong)",
  ceramica:        "var(--color-ceramica)",
} as const;

export const errorNumeral: Record<string, string> = {
  "401": cssVar.olive,
  "403": cssVar.olive,
  "404": cssVar.mostarda,
  "500": cssVar.ceramica,
  "503": cssVar.ceramica,
};
export const errorNumeralFallback = cssVar.ceramica;
