import { ImageResponse } from "next/og";
import { join } from "path";
import { readFileSync } from "fs";

const rootDir = process.cwd();
const fontsDir = join(rootDir, "fonts");

const geistSans = readFileSync(join(fontsDir, "GeistSans-Regular.ttf"));
const geistSansMono = readFileSync(join(fontsDir, "GeistMono-Regular.ttf"));
const geistSansMonoMedium = readFileSync(join(fontsDir, "GeistMono-Medium.ttf"));
const geistSansMonoBold = readFileSync(join(fontsDir, "GeistMono-Bold.ttf"));

const nathanThomasImageBuffer = readFileSync(join(rootDir, "public/images/nathan.jpg"));
const nathanThomasImageBase64 = nathanThomasImageBuffer.toString("base64");
const nathanThomasImage = `data:image/jpeg;base64,${nathanThomasImageBase64}`;

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        fontFamily: "Geist Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          paddingLeft: 80,
          paddingRight: 120,
        }}
      >
        <img src={nathanThomasImage} alt="Nathan Thomas" width={340} height={340} style={{ borderRadius: 9999 }} />
        <div
          style={{
            display: "flex",
            height: 300,
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-start",
            width: "100%",
            paddingLeft: 40,
          }}
        >
          <h1 style={{ fontFamily: "Geist Mono Medium", fontSize: 72, marginBlock: 20 }}>Nathan Thomas</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              columnGap: 16,
              fontSize: 30,
              marginBlock: 8,
            }}
          >
            <span
              style={{
                color: "#6b7280",
                flexShrink: 0,
                marginTop: 4,
                marginRight: 12,
                fontSize: 28,
                lineHeight: 1,
                fontFamily: "Geist Sans",
              }}
            >
              ‣
            </span>
            <span style={{ fontFamily: "Geist Mono" }}>Software Engineer and Teacher</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              columnGap: 16,
              fontSize: 30,
              marginBlock: 8,
            }}
          >
            <span
              style={{
                color: "#6b7280",
                flexShrink: 0,
                marginTop: 4,
                marginRight: 12,
                fontSize: 28,
                lineHeight: 1,
                fontFamily: "Geist Sans",
              }}
            >
              ‣
            </span>
            <span style={{ fontFamily: "Geist Mono" }}>Prev at Tesla, Loom, and Twitter</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              columnGap: 16,
              fontSize: 30,
              marginBlock: 8,
            }}
          >
            <span
              style={{
                color: "#6b7280",
                flexShrink: 0,
                marginTop: 4,
                marginRight: 12,
                fontSize: 28,
                lineHeight: 1,
                fontFamily: "Geist Sans",
              }}
            >
              ‣
            </span>
            <span style={{ fontFamily: "Geist Mono" }}>Lives in San Francisco, CA</span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist Sans",
          data: geistSans,
          weight: 400,
        },
        {
          name: "Geist Mono",
          data: geistSansMono,
          weight: 400,
        },
        {
          name: "Geist Mono Medium",
          data: geistSansMonoMedium,
          weight: 500,
        },
        {
          name: "Geist Mono Bold",
          data: geistSansMonoBold,
          weight: 700,
        },
      ],
    },
  );
}
