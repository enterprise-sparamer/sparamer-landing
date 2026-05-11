import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mirrors public/favicon.svg in raster for iOS home-screen.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0e0e0c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="#f4f0e8"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M 12 1 A 11 11 0 0 1 12 23"
            stroke="#b8924a"
            strokeWidth="1.25"
            fill="none"
          />
          <circle cx="12" cy="12" r="2.5" fill="#b8924a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
