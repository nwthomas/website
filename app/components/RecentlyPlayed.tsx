import { sx } from "@/app/styles/tw.stylex";
import Image from "next/image";
import type { NowPlayingTrack } from "@/app/utils/spotify";

type Props = {
  track: NowPlayingTrack;
};

export function RecentlyPlayed({ track }: Props) {
  return (
    <div {...sx("mt5")}>
      <h2 {...sx("textBase fontSemibold")}>Recently Played</h2>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${track.track} by ${track.artists} on Spotify`}
        {...sx("mt5 ml4 flex wFit itemsCenter gap3 noUnderline")}
      >
        {track.albumImageUrl ? (
          <Image
            src={track.albumImageUrl}
            alt={`Album artwork for ${track.track} by ${track.artists}`}
            width={48}
            height={48}
            {...sx("block border borderMuted")}
          />
        ) : null}
        <span>
          <span {...sx("fontMedium textStrong")}>{track.track}</span>
          {" — "}
          <span {...sx("textSoft")}>{track.artists}</span>
        </span>
      </a>
    </div>
  );
}
