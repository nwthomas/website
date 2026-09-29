import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import type { NowPlayingTrack } from "@/app/utils/spotify";

type Props = {
  track: NowPlayingTrack;
};

export function RecentlyPlayed({ track }: Props) {
  return (
    <div {...stylex.props(styles.container)}>
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
        <span>
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
    height: 48,
    width: 48,
  },
  artists: {
    color: "var(--recently-played-artist)",
  },
  container: {
    marginTop: "1.25rem",
  },
  heading: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  link: {
    gap: "0.75rem",
    alignItems: "center",
    display: "flex",
    textDecorationLine: "none",
    marginLeft: "1rem",
    marginTop: "1.25rem",
    width: "fit-content",
  },
  track: {
    color: "var(--recently-played-track)",
    fontWeight: 500,
  },
});
