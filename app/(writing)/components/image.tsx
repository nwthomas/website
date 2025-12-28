export function Image({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <span className="my-5 rounded-sm overflow-hidden">
      <img src={src} alt={alt} width={width} height={height} />
    </span>
  );
}
