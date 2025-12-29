"use client";

import { showImageOverlay } from "@/store/reducers/writingSlice";
import { useDispatch } from "react-redux";

export function Image({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const dispatch = useDispatch();

  const handleImageClick = () => {
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
      <span
        className="w-full max-w-2xl my-5 hover:opacity-80 cursor-zoom-in transition-opacity duration-200 mx-5"
        onClick={handleImageClick}
      >
        <img src={src} alt={alt} width={width} height={height} />
      </span>
    </div>
  );
}
