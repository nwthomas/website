"use client";

import React, { useEffect, useState } from "react";
import { selectIsShowingImageOverlay, selectOverlayImage } from "@/app/store/selectors/writingSelectors";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "./Icons";
import { FocusTrap } from "focus-trap-react";
import Image from "next/image";
import { hideImageOverlay } from "@/app/store/reducers/writingSlice";
import { sx } from "@/app/styles/tw.stylex";
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
      <div
        onClick={handleCloseButtonClick}
        {...sx("fixed top0 left0 bottom0 right0 wFull hFull inset0 z10 bgBackground")}
      >
        <div {...sx("wFull hFull flex flexCol justifyCenter itemsCenter p5")}>
          <button
            {...sx("absolute top5 right5 h6 w6 cursorPointer m0 p0 opacityHover80 z10")}
            aria-label="Close image overlay"
            onClick={handleCloseButtonClick}
          >
            <CloseIcon color="var(--foreground)" />
          </button>
          <div
            {...sx(
              "maxOverlay boxBorder flex justifyCenter itemsCenter relative",
              image.borderDark && "border borderMuted",
              image.borderLight && "border borderMuted",
            )}
          >
            {image.placeholderImage && isLoading ? (
              <Image
                {...sx("absolute top0 left0 right0 bottom0 z10 block roundedSm")}
                src={image.placeholderImage}
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={75}
              />
            ) : null}
            <Image
              alt={image.alt}
              {...sx("block roundedSm")}
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
