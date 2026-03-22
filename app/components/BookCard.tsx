import Image from "next/image";

type Props = {
  title: string;
  author: string;
  cover: string;
  url: string;
  height: number;
  unoptimized?: boolean;
  width: number;
};

export function BookCard({ title, author, cover, url, height, width, unoptimized }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline block"
      aria-label={`${title} by ${author}`}
    >
      <div className="group flex flex-col gap-3">
        <div
          className={`aspect-ratio-[${width}/${height}] relative w-full overflow-hidden block border border-gray-200 dark:border-gray-800`}
        >
          <Image
            src={cover}
            alt={title}
            height={height}
            width={width}
            className="object-cover"
            quality={75}
            draggable={false}
            loading="eager"
            unoptimized={Boolean(unoptimized)}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-sm font-medium leading-snug">{title}</span>
          <span className="font-mono text-xs text-gray-500 leading-snug">{author}</span>
        </div>
      </div>
    </a>
  );
}
