"use client";

import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import type { NowPlayingTrack } from "@/app/utils/spotify";

// Presentational client component. The track is fetched server-side by the
// homepage (ISR) and passed in, so the markup is fully server-rendered and
// hydration is a no-op.
export function SpotifyRecentlyPlayed({ track }: { track: NowPlayingTrack | null }) {
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
            priority
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

const styles = stylex.create({
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
