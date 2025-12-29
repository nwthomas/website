"use client";

import NextImage from "next/image";
import { showImageOverlay } from "@/store/reducers/writingSlice";
import { useDispatch } from "react-redux";

type Props = {
  alt?: string;
  height: number;
  isHeroImage?: boolean;
  placeholderImage: string;
  src: string;
  title?: string;
  width: number;
};

export function Image({ alt = "", height = 0, width = 0, src }: Props) {
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
      }),
    );
  };

  const image = (
    <div className={`aspect-ratio-[${width}/${height}] block leading-none relative w-full`}>
      <NextImage
        alt={alt}
        // TODO: Add placeholder image and add back blur placeholder
        // blurDataURL=""
        draggable={false}
        height={height}
        loading="eager"
        // placeholder="blur"
        priority
        quality={100}
        src={src}
        width={width}
      />
    </div>
  );

  return (
    <div className="w-full flex justify-center">
      <button
        aria-label="Enlarge image"
        className="w-full max-w-2xl my-5 hover:opacity-80 cursor-zoom-in transition-opacity duration-200 mx-5 items-center flex overflow-hidden"
        onClick={handleImageClick}
      >
        {image}
      </button>
    </div>
  );
}
