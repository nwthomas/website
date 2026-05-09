import { ImageResponse } from "@vercel/og";
import { createFileRoute } from "@tanstack/react-router";
import { readFileSync } from "fs";
import { join } from "path";

const rootDir = process.cwd();
const fontsDir = join(rootDir, "fonts");

const geistSans = readFileSync(join(fontsDir, "GeistSans-Regular.ttf"));
const geistSansMono = readFileSync(join(fontsDir, "GeistMono-Regular.ttf"));
const geistSansMonoMedium = readFileSync(join(fontsDir, "GeistMono-Medium.ttf"));
const geistSansMonoBold = readFileSync(join(fontsDir, "GeistMono-Bold.ttf"));

const nathanThomasImageBuffer = readFileSync(join(rootDir, "public/images/nathan.jpg"));
const nathanThomasImageBase64 = nathanThomasImageBuffer.toString("base64");
const nathanThomasImage = `data:image/jpeg;base64,${nathanThomasImageBase64}`;

export const Route = createFileRoute("/opengraph-image")({
  server: {
    handlers: {
      GET: async () => {
        return new ImageResponse(
          <div tw="flex items-center justify-center w-full h-full bg-white" style={{ fontFamily: "Geist Mono" }}>
            <div tw="flex items-center justify-between w-full h-full pl-20 pr-30">
              <img src={nathanThomasImage} alt="Nathan Thomas" width={340} height={340} tw="rounded-full" />
              <div tw="flex h-[300px] flex-col flex-1 justify-start w-full pl-10">
                <h1 tw="text-7xl my-5" style={{ fontFamily: "Geist Mono Medium" }}>
                  Nathan Thomas
                </h1>
                <div tw="flex flex-row items-start gap-x-4 text-3xl my-2">
                  <span tw="text-gray-500 shrink-0 mt-1 mr-3 text-[28px] leading-none" style={{ fontFamily: "Geist Sans" }}>
                    ‣
                  </span>
                  <span style={{ fontFamily: "Geist Mono" }}>Engineering at Cursor</span>
                </div>
                <div tw="flex flex-row items-start gap-x-4 text-3xl my-2">
                  <span tw="text-gray-500 shrink-0 mt-1 mr-3 text-[28px] leading-none" style={{ fontFamily: "Geist Sans" }}>
                    ‣
                  </span>
                  <span style={{ fontFamily: "Geist Mono" }}>Teacher, Writer, and Speaker</span>
                </div>
                <div tw="flex flex-row items-start gap-x-4 text-3xl my-2">
                  <span tw="text-gray-500 shrink-0 mt-1 mr-3 text-[28px] leading-none" style={{ fontFamily: "Geist Sans" }}>
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
      },
    },
  },
});
