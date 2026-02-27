export type NowPlayingTrack = {
  track: string;
  artists: string;
  album: string;
  albumImageUrl: string | null;
  url: string;
};

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

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
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function normalizeTrack(item: {
  name: string;
  artists: Array<{ name: string }>;
  album: { name: string; images?: Array<{ url: string }> };
  external_urls: { spotify: string };
}): NowPlayingTrack {
  const artists = item.artists.map((a) => a.name).join(", ");
  const image = item.album.images?.[0]?.url ?? null;
  return {
    track: item.name,
    artists,
    album: item.album.name,
    albumImageUrl: image,
    url: item.external_urls.spotify,
  };
}

export async function getCurrentlyPlaying(accessToken: string): Promise<NowPlayingTrack | null> {
  const res = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204 || !res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    item?: {
      name: string;
      artists: Array<{ name: string }>;
      album: { name: string; images?: Array<{ url: string }> };
      external_urls: { spotify: string };
    };
  };
  const item = data.item;
  if (!item) {
    return null;
  }

  return normalizeTrack(item);
}

export async function getRecentlyPlayed(accessToken: string, limit = 1): Promise<NowPlayingTrack | null> {
  const res = await fetch(`${SPOTIFY_API_BASE}/me/player/recently-played?limit=${limit}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    items?: Array<{
      track: {
        name: string;
        artists: Array<{ name: string }>;
        album: { name: string; images?: Array<{ url: string }> };
        external_urls: { spotify: string };
      };
    }>;
  };

  const first = data.items?.[0]?.track;
  if (!first) {
    return null;
  }

  return normalizeTrack(first);
}

export async function getNowPlaying(): Promise<NowPlayingTrack | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return null;
  }

  let track: NowPlayingTrack | null = await getCurrentlyPlaying(accessToken);
  if (!track) {
    track = await getRecentlyPlayed(accessToken, 1);
  }

  return track;
}
