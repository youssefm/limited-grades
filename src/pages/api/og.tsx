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
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        <img
          src="https://www.limitedgrades.com/android-chrome-512x512.png"
          height={384}
        />
        <div style={{ marginTop: 48, color: "#f5f5f5" }}>Limited Grades</div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
    }
  );

export default handler;
