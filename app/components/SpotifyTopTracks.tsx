import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import * as stylex from "@stylexjs/stylex";
import { HorizontalScroller } from "@/app/components/HorizontalScroller";
import { getWeeklyTopTracks, type SpotifyTrack } from "@/app/utils/spotify";

// Enough album covers to fill the first screen of the row on wide displays; the rest load lazily as they scroll in
const EAGER_IMAGE_COUNT = 8;

// Rendered on the server as part of the homepage's static output, which is
// regenerated on the homepage's revalidate interval rather than per request.
// A failed Spotify fetch is never cached, so the next regeneration tries again.
export async function SpotifyTopTracks() {
  let tracks: SpotifyTrack[] = [];
  try {
    tracks = await getWeeklyTopTracks();
  } catch (error) {
    Sentry.captureException(error);

    // Failing a regeneration makes Next keep serving the last good page and retry on the next
    // request. During the build (and in dev) there's no previous page, so render without tracks.
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
      throw error;
    }
  }

  if (!tracks.length) {
    return null;
  }

  return (
    <div {...stylex.props(styles.section)}>
      <h2>Recently Played</h2>
      <div {...stylex.props(styles.bleed)}>
        <HorizontalScroller label="Recently played tracks on Spotify" style={styles.row}>
          {tracks.map((track, index) => (
            <li key={track.id} data-unstyled="true" {...stylex.props(styles.card)}>
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
                    alt={`Album artwork for ${track.album} by ${track.artists}`}
                    width={640}
                    height={640}
                    sizes="(min-width: 640px) 12.5rem, 10rem"
                    loading={index < EAGER_IMAGE_COUNT ? "eager" : "lazy"}
                    {...stylex.props(styles.album)}
                  />
                ) : (
                  <span {...stylex.props(styles.album, styles.albumPlaceholder)} />
                )}
                <span {...stylex.props(styles.text, styles.track)}>{track.track}</span>
                <span {...stylex.props(styles.text, styles.artists)}>{track.artists}</span>
              </a>
            </li>
          ))}
        </HorizontalScroller>
      </div>
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
    objectFit: "cover",
    height: "auto",
    width: "100%",
  },
  albumPlaceholder: {
    backgroundColor: "var(--skeleton-base)",
  },
  artists: {
    color: "var(--foreground-muted)",
  },
  // Break out of the centered page column so the row spans the full page width
  bleed: {
    marginLeft: "calc(50% - 50cqw)",
    marginTop: "1rem",
    width: "100cqw",
  },
  card: {
    flexShrink: 0,
    width: {
      default: "10rem",
      "@media (min-width: 640px)": "12.5rem",
    },
  },
  link: {
    display: "flex",
    flexDirection: "column",
    textDecorationLine: "none",
  },
  row: {
    gap: "1rem",
    display: "flex",
    paddingLeft: {
      default: "1.25rem",
      "@media (min-width: 1024px)": "2.5rem",
    },
    paddingRight: {
      default: "1.25rem",
      "@media (min-width: 1024px)": "2.5rem",
    },
  },
  section: {
    marginTop: "1.25rem",
  },
  text: {
    overflow: "hidden",
    display: "block",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  track: {
    color: "var(--foreground)",
    fontWeight: 500,
    marginTop: "0.625rem",
  },
});
