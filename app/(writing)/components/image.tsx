"use client";

import NextImage from "next/image";
import { showImageOverlay } from "@/app/store/reducers/writingSlice";
import { sx } from "@/app/styles/tw.stylex";
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
  unoptimized,
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
    <div {...sx("wFull flex justifyCenter flexCol itemsCenter mb5")}>
      <button
        aria-label="Enlarge image"
        {...sx(
          "wFull mx5 itemsCenter flex overflowHidden border borderBackground",
          wide ? "maxW4xl" : "maxW2xl",
          (borderDark || borderLight) && "border borderMuted",
          !disableOverlay && "opacityHover60 cursorZoomIn transitionOpacity",
        )}
        onClick={handleImageClick}
        disabled={disableOverlay}
      >
        <div {...sx("leadingNone relative wFull flex justifyCenter")} style={{ aspectRatio: `${width} / ${height}` }}>
          {placeholderImage && isLoading ? (
            <NextImage
              {...sx("absolute top0 left0 right0 bottom0 z10 roundedSm")}
              src={placeholderImage}
              alt={alt}
              loading="eager"
              priority
              width={width}
              height={height}
              quality={75}
            />
          ) : null}
          <NextImage
            alt={alt}
            {...sx("roundedSm")}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5WZ5kAAAAASUVORK5CYII="
            draggable={false}
            height={height}
            loading={shouldPreload ? "eager" : "lazy"}
            placeholder="blur"
            priority={shouldPreload}
            quality={100}
            onLoad={() => setIsLoading(false)}
            src={src}
            unoptimized={unoptimized}
            width={width}
          />
        </div>
      </button>
      <p {...sx("textXs mt2 textGray500 fontMono")}>{title}</p>
    </div>
  );
}
