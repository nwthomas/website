export function Image({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  console.log("image", src, alt, width, height);
  return (
    <div className="w-full flex justify-center">
      <span className="w-full max-w-2xl my-5 hover:opacity-80 cursor-zoom-in transition-opacity duration-200 mx-5">
        <img src={src} alt={alt} width={width} height={height} />
      </span>
    </div>
  );
}
