"use client";

import NextImage from "next/image";
import { clsx } from "clsx";
import { showImageOverlay } from "@/app/store/reducers/writingSlice";
import { useDispatch } from "react-redux";

type Props = {
  index: number;
  alt?: string;
  height: number;
  isHeroImage?: boolean;
  placeholderImage: string;
  src: string;
  title?: string;
  width: number;
  wide?: boolean;
};

export function Image({ alt = "", height = 0, index, width = 0, src, wide }: Props) {
  const dispatch = useDispatch();
  const shouldPreload = index === 0;

  console.log("wide", wide);

  const handleImageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(
      showImageOverlay({
        alt,
        height,
        placeholderImage: "",
        width,
        src,
      }),
    );
  };

  return (
    <div className="w-full flex justify-center">
      <button
        aria-label="Enlarge image"
        className={clsx(
          "w-full mb-5 hover:opacity-80 cursor-zoom-in transition-opacity duration-200 mx-5 items-center flex overflow-hidden",
          wide ? "max-w-4xl" : "max-w-2xl",
        )}
        onClick={handleImageClick}
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
            quality={75}
            src={src}
            width={width}
          />
        </div>
      </button>
    </div>
  );
}
