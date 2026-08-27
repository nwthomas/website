import Image from "next/image";
import * as stylex from "@stylexjs/stylex";

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
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${title} by ${author}`} {...stylex.props(styles.link)}>
      <div {...stylex.props(styles.card)}>
        <div
          {...stylex.props(styles.cover)}
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image
            src={cover}
            alt={title}
            height={height}
            width={width}
            {...stylex.props(styles.coverImage)}
            quality={75}
            draggable={false}
            loading="eager"
            unoptimized={Boolean(unoptimized)}
          />
        </div>
        <div {...stylex.props(styles.meta)}>
          <span {...stylex.props(styles.title)}>{title}</span>
          <span {...stylex.props(styles.author)}>{author}</span>
        </div>
      </div>
    </a>
  );
}

const styles = stylex.create({
  author: {
    color: "var(--muted)",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.75rem",
    lineHeight: 1.375,
  },
  card: {
    gap: "0.75rem",
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    borderColor: "var(--border-subtle)",
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    display: "block",
    position: "relative",
    width: "100%",
  },
  coverImage: {
    display: "block",
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },
  link: {
    display: "block",
    textDecorationLine: "none",
  },
  meta: {
    gap: "0.125rem",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.375,
  },
});
