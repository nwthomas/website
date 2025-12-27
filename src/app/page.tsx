import Link from "next/link";
import { getYearsCoding } from "@/utils/utils";

export default function Page() {
  return (
    <section className="w-full max-w-2xl">
      <p>
        I'm a{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          software engineer
        </a>
        ,{" "}
        <Link aria-label="Link to Nathan's writing" href="/writing">
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
        . I'm currently on sabbatical and working on my next thing. Previously, I led core work at{" "}
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
      <p className="pt-5">
        I fell in love with technology as a little kid and never left. Eventually, I learned to code and I've been
        coding for {getYearsCoding()} years love every piece of technology I can{" "}
        <Link aria-label="Link to Nathan's bookmarks" href="/bookmarks">
          learn about
        </Link>
        .
      </p>
      <p className="pt-5">These are some of my favorite posts:</p>
      <ul className="pt-5">
        <li>
          <a>On Finding Confidence</a>On Finding Confidence
        </li>
        <li>The Pursuit of Persistence and Grit</li>
        <li>React Native Web at Twitter</li>
      </ul>
      {/* <p className="pt-5">Traces of me across the internet:</p>
      <ul className="pt-5 ">
        <li>
          <a
            href="https://github.com/nwthomas"
            aria-label="Link to Nathan's profile on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/nwthomas/"
            aria-label="Link to Nathan's profile on Instagram"
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/nwthomas-dev/"
            aria-label="Link to Nathan's profile on LinkedIn"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://open.spotify.com/user/nathanwthomas"
            aria-label="Link to Nathan's profile on Spotify"
            rel="noopener noreferrer"
            target="_blank"
          >
            Spotify
          </a>
        </li>
        <li>
          <a
            href="https://nathanthomas.substack.com/"
            aria-label="Link to Nathan's profile on Substack"
            rel="noopener noreferrer"
            target="_blank"
          >
            Substack
          </a>
        </li>
        <li>
          <a
            href="https://www.threads.com/@nwthomas"
            aria-label="Link to Nathan's profile on Threads"
            rel="noopener noreferrer"
            target="_blank"
          >
            Threads
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@nwthomas_"
            aria-label="Link to Nathan's profile on TikTok"
            rel="noopener noreferrer"
            target="_blank"
          >
            TikTok
          </a>
        </li>
        <li>
          <a
            href="https://x.com/nwthomas"
            aria-label="Link to Nathan's profile on X"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitch
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@nwthomas"
            aria-label="Link to Nathan's profile on YouTube"
            rel="noopener noreferrer"
            target="_blank"
          >
            YouTube
          </a>
        </li>
      </ul> */}
      <p className="pt-5">
        You can read my{" "}
        <Link aria-label="Link to Nathan's writing" href="/writing">
          writing
        </Link>
        ,{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          code
        </a>
        , or follow me online. I also angel invest in startups, so please{" "}
        <a href="mailto:contact@nathanthomas.dev">reach out</a> if interested.
      </p>
    </section>
  );
}
