"use client";

import clsx from "clsx";
import { showImageOverlay } from "@/store/reducers/writingSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

type Props = {
  alt?: string;
  borderDark?: boolean;
  borderLight?: boolean;
  disableOverlay?: boolean;
  height: number;
  placeholderImage?: string;
  shouldPreload?: boolean;
  src: string;
  title?: string;
  unoptimized?: boolean;
  width: number;
  wide?: boolean;
};

export function Image({
  alt = "",
  borderDark,
  borderLight,
  disableOverlay,
  height = 0,
  placeholderImage,
  shouldPreload,
  src,
  title,
  unoptimized: _unoptimized,
  width = 0,
  wide,
}: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handleImageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(
      showImageOverlay({
        alt,
        height,
        placeholderImage: placeholderImage || "",
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
          {placeholderImage && isLoading ? (
            <img
              className="absolute top-0 left-0 right-0 bottom-0 z-10 rounded-sm"
              src={placeholderImage}
              alt={alt}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              width={width}
              height={height}
            />
          ) : null}
          <img
            alt={alt}
            className="rounded-sm"
            draggable={false}
            height={height}
            width={width}
            loading={shouldPreload ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={shouldPreload ? "high" : "auto"}
            onLoad={() => setIsLoading(false)}
            src={src}
          />
        </div>
      </button>
      <p className="text-xs mt-2 text-gray-500 font-mono">{title}</p>
    </div>
  );
}
