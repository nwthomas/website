import { ImageResponse } from "next/og";
import { join } from "path";
import { readFileSync } from "fs";

const rootDir = process.cwd();
const fontsDir = join(rootDir, "fonts");

const geistSansMono = readFileSync(join(fontsDir, "GeistMono-Regular.ttf"));
const geistSansMonoMedium = readFileSync(join(fontsDir, "GeistMono-Medium.ttf"));
const geistSansMonoBold = readFileSync(join(fontsDir, "GeistMono-Bold.ttf"));

const nathanThomasImageBuffer = readFileSync(join(rootDir, "public/images/nathan.jpg"));
const nathanThomasImageBase64 = nathanThomasImageBuffer.toString("base64");
const nathanThomasImage = `data:image/jpeg;base64,${nathanThomasImageBase64}`;

export async function GET() {
  return new ImageResponse(
    <div tw="flex items-center justify-center w-full h-full bg-white" style={{ fontFamily: "Geist Mono" }}>
      <div tw="flex items-center justify-between w-full h-full px-20">
        <img src={nathanThomasImage} alt="Nathan Thomas" width={340} height={340} tw="rounded-full" />
        <div tw="flex h-[300px] flex-col justify-start w-full pl-10">
          <h1 tw="text-7xl my-5" style={{ fontFamily: "Geist Mono Medium" }}>
            Nathan Thomas
          </h1>
          <p tw="text-3xl my-2" style={{ fontFamily: "Geist Mono" }}>
            - Software Engineer, Writer, Teacher
          </p>
          <p tw="text-3xl my-2" style={{ fontFamily: "Geist Mono" }}>
            - Ex Tesla, Loom, Twitter (X)
          </p>
          <p tw="text-3xl my-2" style={{ fontFamily: "Geist Mono" }}>
            - Lives in San Francisco, CA
          </p>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
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
