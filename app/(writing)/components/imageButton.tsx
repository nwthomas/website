"use client";

import { clsx } from "clsx";
import { showImageOverlay } from "@/app/store/reducers/writingSlice";
import { useDispatch } from "react-redux";

type ImageButtonProps = {
  alt?: string;
  borderDark?: boolean;
  borderLight?: boolean;
  children: React.ReactNode;
  disableOverlay?: boolean;
  height: number;
  src: string;
  title?: string;
  wide?: boolean;
  width: number;
};

export function ImageButton({
  alt = "",
  borderDark,
  borderLight,
  children,
  disableOverlay,
  height = 0,
  src,
  title,
  wide,
  width = 0,
}: ImageButtonProps) {
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
        {children}
      </button>
      <p className="text-xs mt-2 text-gray-500 font-mono">{title}</p>
    </div>
  );
}
