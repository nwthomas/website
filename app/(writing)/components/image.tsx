import { ImageButton } from "./imageButton";
import NextImage from "next/image";

type Props = {
  alt?: string;
  borderDark?: boolean;
  borderLight?: boolean;
  disableOverlay?: boolean;
  height: number;
  isHeroImage?: boolean;
  shouldPreload?: boolean;
  src: string;
  title?: string;
  width: number;
  wide?: boolean;
};

export function Image({
  alt = "",
  borderDark,
  borderLight,
  disableOverlay,
  height = 0,
  shouldPreload,
  src,
  title,
  width = 0,
  wide,
}: Props) {
  // Children passed to a client component are rendered by this (server) parent,
  // so NextImage runs in the RSC tree and Next.js can emit the priority preload link.
  return (
    <ImageButton
      alt={alt}
      borderDark={borderDark}
      borderLight={borderLight}
      disableOverlay={disableOverlay}
      height={height}
      src={src}
      title={title}
      wide={wide}
      width={width}
    >
      <div className={`aspect-ratio-[${width}/${height}] leading-none relative w-full flex justify-center`}>
        <NextImage
          alt={alt}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5WZ5kAAAAASUVORK5CYII="
          draggable={false}
          height={height}
          loading={shouldPreload ? "eager" : "lazy"}
          placeholder="blur"
          priority={shouldPreload}
          quality={100}
          src={src}
          width={width}
        />
      </div>
    </ImageButton>
  );
}
