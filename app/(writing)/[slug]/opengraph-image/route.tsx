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
  const postViewsPostfix = postViews && postViews == 1 ? "view" : "views";

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
          paddingInline: 80,
        }}
      >
        <img src={nathanThomasImage} alt="Nathan Thomas" width={340} height={340} style={{ borderRadius: 9999 }} />
        <div
          style={{
            display: "flex",
            height: 300,
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingLeft: 40,
          }}
        >
          <h1
            style={{
              fontFamily: "Geist Mono Medium",
              fontSize: 48,
              marginBlock: 20,
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            {title}
          </h1>
          <p style={{ display: "flex", fontSize: 30, marginBlock: 8, flex: 2, fontFamily: "Geist Mono" }}>
            {description}
          </p>
          <p style={{ fontSize: 24, color: "#6b7280", flex: 1, fontFamily: "Geist Mono" }}>
            {postViews != null && postViews != 0 ? `${date} • ${postViews} ${postViewsPostfix}` : date}
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
