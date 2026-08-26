"use client";

import NextImage from "next/image";
import * as stylex from "@stylexjs/stylex";
import { showImageOverlay } from "@/app/store/reducers/writingSlice";
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
    <div {...stylex.props(styles.wrapper)}>
      <button
        aria-label="Enlarge image"
        {...stylex.props(
          styles.button,
          wide ? styles.wide : styles.standard,
          borderDark && styles.borderDark,
          borderLight && styles.borderLight,
          !disableOverlay && styles.canZoom,
        )}
        onClick={handleImageClick}
        disabled={disableOverlay}
      >
        <div {...stylex.props(styles.frame)} style={{ aspectRatio: `${width} / ${height}` }}>
          {placeholderImage && isLoading ? (
            <NextImage
              src={placeholderImage}
              alt={alt}
              loading="eager"
              priority
              width={width}
              height={height}
              quality={75}
              {...stylex.props(styles.placeholder)}
            />
          ) : null}
          <NextImage
            alt={alt}
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
            {...stylex.props(styles.image)}
          />
        </div>
      </button>
      <p {...stylex.props(styles.caption)}>{title}</p>
    </div>
  );
}

const styles = stylex.create({
  borderDark: {
    borderColor: "var(--border-image-dark)",
  },
  borderLight: {
    borderColor: "var(--border-image-light)",
  },
  button: {
    borderColor: "var(--background)",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    display: "flex",
    marginLeft: "1.25rem",
    marginRight: "1.25rem",
    width: "100%",
  },
  canZoom: {
    cursor: "zoom-in",
    opacity: {
      default: 1,
      ":hover": 0.6,
    },
    transitionDuration: "200ms",
    transitionProperty: "opacity",
  },
  caption: {
    color: "var(--muted)",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.75rem",
    marginTop: "0.5rem",
  },
  frame: {
    display: "flex",
    justifyContent: "center",
    lineHeight: 1,
    position: "relative",
    width: "100%",
  },
  image: {
    borderRadius: "0.125rem",
  },
  placeholder: {
    borderRadius: "0.125rem",
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  standard: {
    maxWidth: "42rem",
  },
  wide: {
    maxWidth: "56rem",
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "1.25rem",
    width: "100%",
  },
});
