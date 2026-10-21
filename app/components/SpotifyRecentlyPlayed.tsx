import * as Sentry from "@sentry/nextjs";
import { connection } from "next/server";
import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { getNowPlaying } from "@/app/utils/spotify";

export async function SpotifyRecentlyPlayed() {
  // Wait for Redis and Spotify at request time, inside the homepage Suspense
  // boundary so the rest of the page can stream immediately.
  await connection();

  let track = null;
  try {
    track = await getNowPlaying();
  } catch (error) {
    Sentry.captureException(error);
  }

  if (!track) {
    return <span hidden data-spotify-empty="" />;
  }

  return (
    <div>
      <h2 {...stylex.props(styles.heading)}>Recently Played</h2>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${track.track} by ${track.artists} on Spotify`}
        {...stylex.props(styles.link)}
      >
        {track.albumImageUrl ? (
          <Image
            src={track.albumImageUrl}
            alt={`Album artwork for ${track.track} by ${track.artists}`}
            width={48}
            height={48}
            {...stylex.props(styles.album)}
          />
        ) : null}
        <span {...stylex.props(styles.trackText)}>
          <span {...stylex.props(styles.track)}>{track.track}</span>
          {" — "}
          <span {...stylex.props(styles.artists)}>{track.artists}</span>
        </span>
      </a>
    </div>
  );
}

export function SpotifyRecentlyPlayedSkeleton() {
  return (
    <div role="status" aria-label="Loading recently played track">
      <div {...stylex.props(styles.headingLine)}>
        <span {...stylex.props(styles.shimmer, styles.headingBar)} />
      </div>
      <div {...stylex.props(styles.link)}>
        <span {...stylex.props(styles.shimmer, styles.albumBar)} />
        <span {...stylex.props(styles.shimmer, styles.trackBar)} />
      </div>
    </div>
  );
}

const shimmer = stylex.keyframes({
  "0%": { backgroundPosition: "100% 0" },
  "100%": { backgroundPosition: "-100% 0" },
});

const styles = stylex.create({
  albumBar: {
    flexShrink: 0,
    height: 48,
    width: 48,
  },
  headingBar: {
    height: "1rem",
    width: "8rem",
  },
  headingLine: {
    alignItems: "center",
    display: "flex",
    height: "1.5rem",
  },
  shimmer: {
    borderRadius: 4,
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    animationName: {
      default: shimmer,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "ease-in-out",
    backgroundImage:
      "linear-gradient(90deg, var(--skeleton-base) 25%, var(--skeleton-highlight) 50%, var(--skeleton-base) 75%)",
    backgroundSize: "200% 100%",
    display: "block",
  },
  trackBar: {
    height: "1rem",
    maxWidth: "100%",
    width: "14rem",
  },
  album: {
    borderColor: "var(--border-subtle)",
    borderStyle: "solid",
    borderWidth: 1,
    aspectRatio: "1 / 1",
    display: "block",
    flexShrink: 0,
    height: 48,
    width: 48,
  },
  artists: {
    color: "var(--recently-played-artist)",
  },
  heading: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "1.5rem",
  },
  link: {
    gap: "0.75rem",
    alignItems: "center",
    display: "flex",
    textDecorationLine: "none",
    height: "3rem",
    marginLeft: "1rem",
    marginTop: "1.25rem",
    maxWidth: "calc(100% - 1rem)",
    width: "fit-content",
  },
  trackText: {
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    display: "-webkit-box",
    lineHeight: "1.5rem",
    overflowWrap: "anywhere",
    minWidth: 0,
  },
  track: {
    color: "var(--recently-played-track)",
    fontWeight: 500,
  },
});
