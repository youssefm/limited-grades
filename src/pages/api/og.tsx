/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const handler = () =>
  new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <img
          src="https://www.limitedgrades.com/android-chrome-512x512.png"
          height={192}
        />
        <div style={{ marginTop: 24, color: "#f5f5f5" }}>Limited Grades</div>
      </div>
    ),
    { width: 600, height: 315 }
  );

export default handler;
