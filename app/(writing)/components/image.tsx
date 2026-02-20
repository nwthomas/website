"use client";

import NextImage from "next/image";
import { clsx } from "clsx";
import { showImageOverlay } from "@/app/store/reducers/writingSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const handleImageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(
      showImageOverlay({
        alt,
        height,
        placeholderImage: "",
        width,
        src,
        borderDark,
        borderLight,
      }),
    );
  };

  return (
    <div className="w-full flex justify-center flex-col items-center mb-5">
      <button
        aria-label="Enlarge image"
        className={clsx(
          "w-full mx-5 items-center flex overflow-hidden border border-background",
          wide ? "max-w-4xl" : "max-w-2xl",
          borderDark ? "border border-background dark:border-gray-800" : "",
          borderLight ? "border border-gray-200 dark:border-background" : "",
          disableOverlay ? "" : "hover:opacity-60 cursor-zoom-in transition-opacity duration-200",
        )}
        onClick={handleImageClick}
        disabled={disableOverlay}
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
      </button>
      <p className="text-xs mt-2 text-gray-500 font-mono">{title}</p>
    </div>
  );
}
