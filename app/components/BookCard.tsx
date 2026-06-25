import { sx } from "@/app/styles/tw.stylex";
import Image from "next/image";

type Props = {
  title: string;
  author: string;
  cover: string;
  url: string;
  height: number;
  unoptimized?: boolean;
  width: number;
};

export function BookCard({ title, author, cover, url, height, width, unoptimized }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...sx("noUnderline block")}
      aria-label={`${title} by ${author}`}
    >
      <div {...sx("flex flexCol gap3")}>
        <div
          {...sx("relative wFull overflowHidden block border borderMuted")}
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image
            src={cover}
            alt={title}
            height={height}
            width={width}
            {...sx("objectCover")}
            quality={75}
            draggable={false}
            loading="eager"
            unoptimized={Boolean(unoptimized)}
          />
        </div>
        <div {...sx("flex flexCol gap05")}>
          <span {...sx("fontMono textSm fontMedium leadingSnug")}>{title}</span>
          <span {...sx("fontMono textXs textGray500 leadingSnug")}>{author}</span>
        </div>
      </div>
    </a>
  );
}
