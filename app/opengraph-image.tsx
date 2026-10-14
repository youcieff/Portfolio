import { ImageResponse } from "next/og";

export const alt = "Youssef Maged Hanna — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        color: "#ececef",
        background: "#0e0e10",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#b9b1ff",
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        YM<span style={{ color: "#ececef" }}>.</span>
        <span style={{ color: "#aaaab3", fontSize: 16, fontWeight: 400, letterSpacing: 3 }}>
          PORTFOLIO
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ color: "#aaaab3", fontSize: 20, letterSpacing: 4, textTransform: "uppercase" }}
        >
          Full Stack Developer · Giza, Egypt
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 82,
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          Youssef Maged Hanna
        </div>
        <div style={{ marginTop: 20, color: "#aaaab3", fontSize: 28 }}>
          Useful digital products, thoughtfully built.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #303036",
          paddingTop: 22,
          color: "#aaaab3",
          fontSize: 17,
        }}
      >
        youssefmaged051@gmail.com
        <span style={{ color: "#b9b1ff" }}>Full Stack · AI · Web Experiences</span>
      </div>
    </div>,
    size,
  );
}
