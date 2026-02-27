import Image from "next/image";
import type { NowPlayingTrack } from "@/app/utils/spotify";

type Props = {
  track: NowPlayingTrack;
};

export function NowPlaying({ track }: Props) {
  return (
    <div className="mt-5">
      <h2 className="text-base font-semibold">Recently Played:</h2>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${track.track} by ${track.artists} on Spotify`}
        className="mt-5 flex items-center gap-3 no-underline"
      >
        {track.albumImageUrl ? (
          <Image src={track.albumImageUrl} alt="" width={48} height={48} className="rounded ml-4" />
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="font-medium text-gray-900 dark:text-gray-100">{track.track}</span>
          {" — "}
          <span className="text-gray-600 dark:text-gray-300">{track.artists}</span>
        </span>
      </a>
    </div>
  );
}
