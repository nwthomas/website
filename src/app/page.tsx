import Link from "next/link";
import { Navbar } from "@/components/Navbar";

function getYearsCoding() {
  const currentDate = new Date();
  const codingStartDate = new Date("2018-01-01");
  const years = currentDate.getFullYear() - codingStartDate.getFullYear();

  return years;
}

export default function Page() {
  return (
    <div className="w-2xl px-8">
      <Navbar title="Nathan Thomas" />
      <p className="pt-6">
        I'm a{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's profile on GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          software engineer
        </a>
        ,{" "}
        <Link aria-label="Link to Nathan's blog page" href="/blog">
          writer
        </Link>
        , and{" "}
        <a
          href="https://www.codetenderloin.org"
          aria-label="Link to the Code Tenderloin"
          rel="noopener noreferrer"
          target="_target"
        >
          teacher
        </a>
        . I'm currently on sabbatical and working towards my next thing. Previously, I led work at{" "}
        <a href="https://tesla.com" aria-label="Link to Tesla's website" rel="noopener noreferrer" target="_target">
          Tesla
        </a>
        ,{" "}
        <a href="https://loom.com" aria-label="Link to Loom's website" rel="noopener noreferrer" target="_target">
          Loom
        </a>
        , and{" "}
        <a href="https://x.com" aria-label="Link to X's website" rel="noopener noreferrer" target="_target">
          Twitter (X)
        </a>
        .
      </p>
      <p className="pt-6">
        I fell in love with technology as a little kid and never left. I have been coding for {getYearsCoding()} years
        and love every piece of technology I can{" "}
        <Link aria-label="Link to Nathan's bookmarks page" href="/bookmarks">
          learn about
        </Link>
        .
      </p>
      <p className="pt-6">You can find traces of me across the internet:</p>
      <div className="pt-3 flex gap-4 flex-wrap">
        <a
          className="font-mono"
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's profile on GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        <a
          className="font-mono"
          href="https://www.instagram.com/nwthomas/"
          aria-label="Link to Nathan's profile on Instagram"
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
        </a>
        <a
          className="font-mono"
          href="https://www.linkedin.com/in/nwthomas-dev/"
          aria-label="Link to Nathan's profile on LinkedIn"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className="font-mono"
          href="https://open.spotify.com/user/nathanwthomas"
          aria-label="Link to Nathan's profile on Spotify"
          rel="noopener noreferrer"
          target="_blank"
        >
          Spotify
        </a>
        <a
          className="font-mono"
          href="https://nathanthomas.substack.com/"
          aria-label="Link to Nathan's profile on Substack"
          rel="noopener noreferrer"
          target="_blank"
        >
          Substack
        </a>
        <a
          className="font-mono"
          href="https://www.threads.com/@nwthomas"
          aria-label="Link to Nathan's profile on Threads"
          rel="noopener noreferrer"
          target="_blank"
        >
          Threads
        </a>
        <a
          className="font-mono"
          href="https://www.tiktok.com/@nwthomas_"
          aria-label="Link to Nathan's profile on TikTok"
          rel="noopener noreferrer"
          target="_blank"
        >
          TikTok
        </a>
        <a
          className="font-mono"
          href="https://x.com/nwthomas"
          aria-label="Link to Nathan's profile on X"
          rel="noopener noreferrer"
          target="_blank"
        >
          Twitch
        </a>
        <a
          className="font-mono"
          href="https://www.youtube.com/@nwthomas"
          aria-label="Link to Nathan's profile on YouTube"
          rel="noopener noreferrer"
          target="_blank"
        >
          YouTube
        </a>
      </div>
    </div>
  );
}
