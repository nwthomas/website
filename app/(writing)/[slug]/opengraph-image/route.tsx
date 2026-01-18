import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { formatUTCTimestampToDateString } from "@/app/utils/dates";
import { join } from "path";
import postsJson from "@/app/(writing)/posts.json";
import { readFileSync } from "fs";

const rootDir = process.cwd();
const fontsDir = join(rootDir, "fonts");

const geistSansMono = readFileSync(join(fontsDir, "GeistMono-Regular.ttf"));
const geistSansMonoMedium = readFileSync(join(fontsDir, "GeistMono-Medium.ttf"));
const geistSansMonoBold = readFileSync(join(fontsDir, "GeistMono-Bold.ttf"));

const nathanThomasImageBuffer = readFileSync(join(rootDir, "public/images/nathan.jpg"));
const nathanThomasImageBase64 = nathanThomasImageBuffer.toString("base64");
const nathanThomasImage = `data:image/jpeg;base64,${nathanThomasImageBase64}`;

export async function GET(request: NextRequest) {
  const { posts } = postsJson;
  const pathname = new URL(request.nextUrl).pathname;
  const slug = pathname.split("/").filter(Boolean)[0];
  const post = posts.find((post) => post.id === slug);

  const title = post?.title || "An Essay by Nathan Thomas";
  const description = post?.description || "Read Nathan's writings on technical and soft skills";

  let date = "Today";
  if (post?.date != null) {
    date = formatUTCTimestampToDateString(post.date);
  }

  const postViews = await redis.get<number | null>(getPostViewsRedisKey(slug));

  return new ImageResponse(
    <div tw="flex items-center justify-center w-full h-full bg-white" style={{ fontFamily: "Geist Mono" }}>
      <div tw="flex items-center justify-between w-full h-full px-20">
        <img src={nathanThomasImage} alt="Nathan Thomas" width={340} height={340} tw="rounded-full" />
        <div tw="flex h-[300px] flex-col justify-between flex-1 pl-10">
          <h1 tw="text-5xl my-5 whitespace-normal break-words" style={{ fontFamily: "Geist Mono Medium" }}>
            {title}
          </h1>
          <p tw="flex text-3xl my-2 flex-2" style={{ fontFamily: "Geist Mono" }}>
            {description}
          </p>
          <p tw="text-2xl text-gray-500 flex-1" style={{ fontFamily: "Geist Mono" }}>
            {postViews != null && postViews != 0 ? `${date} • ${postViews} views` : date}
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
