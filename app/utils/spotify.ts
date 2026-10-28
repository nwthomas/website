import { SPOTIFY_TOP_TRACKS_TTL_S, getSpotifyTopTracksRedisKey, redis } from "@/app/utils/redis";

export type SpotifyTrack = {
  id: string;
  track: string;
  artists: string;
  album: string;
  albumImageUrl: string | null;
  url: string;
};

type SpotifyApiTrack = {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { name: string; images?: Array<{ url: string }> };
  external_urls: { spotify: string };
};

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const SPOTIFY_REQUEST_TIMEOUT_MS = 3000;
const SPOTIFY_TOP_TRACKS_LIMIT = 30;

export async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    signal: AbortSignal.timeout(SPOTIFY_REQUEST_TIMEOUT_MS),
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`Spotify request failed (${res.status})`);
  }

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function normalizeTrack(item: SpotifyApiTrack): SpotifyTrack {
  const artists = item.artists.map((a) => a.name).join(", ");
  const image = item.album.images?.[0]?.url ?? null;
  return {
    id: item.id,
    track: item.name,
    artists,
    album: item.album.name,
    albumImageUrl: image,
    url: item.external_urls.spotify,
  };
}

// Spotify's shortest top-items window is "short_term" (roughly the last four weeks).
// Requires the refresh token to have been granted the user-top-read scope.
export async function getTopTracks(accessToken: string, limit = SPOTIFY_TOP_TRACKS_LIMIT): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({ time_range: "short_term", limit: String(limit) });
  const res = await fetch(`${SPOTIFY_API_BASE}/me/top/tracks?${params.toString()}`, {
    signal: AbortSignal.timeout(SPOTIFY_REQUEST_TIMEOUT_MS),
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Spotify request failed (${res.status})`);
  }

  const data = (await res.json()) as { items?: SpotifyApiTrack[] };
  return (data.items ?? []).map(normalizeTrack);
}

export async function getHourlyTopTracks(): Promise<SpotifyTrack[]> {
  if (process.env.NODE_ENV === "production") {
    const cachedTracks = await redis.get<SpotifyTrack[]>(getSpotifyTopTracksRedisKey());
    if (cachedTracks?.length) {
      return cachedTracks;
    }
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return [];
  }

  const tracks = await getTopTracks(accessToken);

  if (process.env.NODE_ENV === "production" && tracks.length) {
    await redis.set(getSpotifyTopTracksRedisKey(), tracks, SPOTIFY_TOP_TRACKS_TTL_S);
  }

  return tracks;
}
