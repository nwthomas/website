import * as Sentry from "@sentry/nextjs";
import { connection } from "next/server";
import { RecentlyPlayed } from "@/app/components/RecentlyPlayed";
import { getNowPlaying } from "@/app/utils/spotify";

export async function SpotifyRecentlyPlayed() {
  // Fetch at request time, keeping the cached track independent of build-time
  // credentials while allowing the rest of the homepage to stream immediately.
  await connection();

  let track;
  try {
    track = await getNowPlaying();
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }

  return track ? <RecentlyPlayed track={track} /> : null;
}
