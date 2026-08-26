"use client";

import React, { useEffect, useState } from "react";
import { selectIsShowingImageOverlay, selectOverlayImage } from "@/app/store/selectors/writingSelectors";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "./Icons";
import { FocusTrap } from "focus-trap-react";
import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { hideImageOverlay } from "@/app/store/reducers/writingSlice";
import { useLockBodyScroll } from "@/app/hooks";

function ImageOverlay() {
  const image = useSelector(selectOverlayImage);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useLockBodyScroll();

  if (!image) {
    return null;
  }

  const handleCloseButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (event.target instanceof HTMLImageElement === false) {
      dispatch(hideImageOverlay());
    }
  };

  return (
    <FocusTrap>
      <div onClick={handleCloseButtonClick} {...stylex.props(styles.overlay)}>
        <div {...stylex.props(styles.inner)}>
          <button
            aria-label="Close image overlay"
            onClick={handleCloseButtonClick}
            {...stylex.props(styles.closeButton)}
          >
            <CloseIcon color="var(--foreground)" style={{ height: "100%", width: "100%" }} />
          </button>
          <div
            {...stylex.props(
              styles.frame,
              image.borderDark && styles.borderDark,
              image.borderLight && styles.borderLight,
            )}
          >
            {image.placeholderImage && isLoading ? (
              <Image
                src={image.placeholderImage}
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={75}
                {...stylex.props(styles.placeholder)}
              />
            ) : null}
            <Image
              alt={image.alt}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5WZ5kAAAAASUVORK5CYII="
              draggable={false}
              height={image.height}
              loading="eager"
              placeholder="blur"
              priority
              quality={100}
              onLoad={() => setIsLoading(false)}
              src={image.src}
              width={image.width}
              {...stylex.props(styles.image)}
            />
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export function ImageOverlayContainer() {
  const isShowingImageOverlay = useSelector(selectIsShowingImageOverlay);
  const dispatch = useDispatch();

  useEffect(() => {
    // On any navigation away from current blog page, clear blog image overlay state
    return () => {
      dispatch(hideImageOverlay());
    };
  }, [dispatch]);

  if (!isShowingImageOverlay) {
    return null;
  }

  return <ImageOverlay />;
}

const styles = stylex.create({
  borderDark: {
    borderColor: "var(--border-image-dark)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  borderLight: {
    borderColor: "var(--border-image-light)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  closeButton: {
    cursor: "pointer",
    opacity: {
      default: 1,
      ":hover": 0.8,
    },
    position: "absolute",
    transitionDuration: "200ms",
    transitionProperty: "opacity",
    zIndex: 10,
    height: "1.5rem",
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    right: "1.25rem",
    top: "1.25rem",
    width: "1.5rem",
  },
  frame: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    maxHeight: "min(80rem, calc(100vh - 2.5rem))",
    maxWidth: "min(80rem, calc(100vw - 2.5rem))",
  },
  image: {
    borderRadius: "0.125rem",
    display: "block",
  },
  inner: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    paddingBottom: "1.25rem",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    paddingTop: "1.25rem",
    width: "100%",
  },
  overlay: {
    backgroundColor: "var(--background)",
    position: "fixed",
    zIndex: 10,
    bottom: 0,
    height: "100%",
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
  },
  placeholder: {
    borderRadius: "0.125rem",
    display: "block",
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
