"use client";

import React, { useEffect } from "react";
import { selectIsShowingImageOverlay, selectOverlayImage } from "@/store/selectors/writingSelectors";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "./Icons";
import { FocusTrap } from "focus-trap-react";
import Image from "next/image";
import { hideImageOverlay } from "@/store/reducers/writingSlice";
import { useLockBodyScroll } from "@/hooks";

function ImageOverlay() {
  const image = useSelector(selectOverlayImage);
  const dispatch = useDispatch();

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
        className="fixed top-0 left-0 bottom-0 right-0 w-full h-full inset-0 z-10 bg-black"
      >
        <div className="w-full h-full flex flex-col justify-center items-center p-5">
          <button
            className="absolute top-5 right-5 h-6 w-6 cursor-pointer m-0 p-0 hover:opacity-80 transition-opacity duration-200 z-10"
            aria-label="Close image overlay"
            onClick={handleCloseButtonClick}
          >
            <CloseIcon color="var(--foreground)" />
          </button>
          <div className="max-w-7xl max-h-7xl flex justify-center items-center">
            <Image
              alt={image.alt}
              draggable={false}
              height={image.height}
              loading="eager"
              priority
              quality={100}
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
