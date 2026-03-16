import Image from "next/image";

type Props = {
  title: string;
  author: string;
  cover: string;
  url: string;
  height: number;
  width: number;
};

export function BookCard({ title, author, cover, url, height, width }: Props) {
  return (
    <a href={url} className="no-underline" aria-label={`${title} by ${author}`}>
      <div className="group flex flex-col gap-3">
        <div className="relative w-full overflow-hidden block border border-gray-200 dark:border-gray-800">
          <Image
            src={cover}
            alt={title}
            height={height}
            width={width}
            className="object-cover"
            quality={75}
            draggable={false}
            preload
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
