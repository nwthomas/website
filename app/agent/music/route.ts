import * as Sentry from "@sentry/nextjs";
import { getHourlyTopTracks, type SpotifyTrack } from "@/app/utils/spotify";

export const revalidate = 3600;

export async function GET() {
  let tracks: SpotifyTrack[] = [];
  try {
    tracks = await getHourlyTopTracks();
  } catch (error) {
    Sentry.captureException(error);
  }

  return Response.json(tracks.map(({ track, artists, album, url }) => ({ track, artists, album, url })));
}
