import Link from "next/link";

export default function Page() {
  return (
    <section className="w-full max-w-2xl">
      <p>
        I'm a{" "}
        <Link href="/bio" aria-label="Link to Nathan's bio">
          software engineer, writer, and teacher
        </Link>{" "}
        from San Francisco, CA. I'm currently on sabbatical and working on my next thing. Previously, I led core work at{" "}
        <a href="https://tesla.com" aria-label="Link to Tesla's website" rel="noopener noreferrer" target="_target">
          Tesla
        </a>
        ,{" "}
        <a href="https://loom.com" aria-label="Link to Loom's website" rel="noopener noreferrer" target="_target">
          Loom
        </a>
        , and{" "}
        <a
          className="break-keep whitespace-nowrap"
          href="https://x.com"
          aria-label="Link to X's website"
          rel="noopener noreferrer"
          target="_target"
        >
          Twitter (X)
        </a>
        .
      </p>
      <p className="pt-5">
        I fell in love with technology and building as a little kid and just never left. At the end of the day, I'm
        still that little kid who grew up using his parents' Macintosh or sat on their floor snapping LEGO pieces
        together while building something insanely great.
      </p>
      <h2 className="pt-5">Writing:</h2>
      <ul className="pt-4">
        <li>
          <Link href="/writing/2025/on-finding-confidence">On Finding Confidence</Link>
        </li>
        <li>
          <Link href="/writing/2019/the-pursuit-of-persistence-and-grit">The Pursuit of Persistence and Grit</Link>
        </li>
      </ul>
      <h2 className="pt-5">Teaching:</h2>
      <ul className="pt-4">
        <li>
          <a
            href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
            aria-label="Link to Nathan's React Native Web at Twitter talk on YouTube"
            rel="noopener noreferrer"
            target="_blank"
          >
            Code Tenderloin (volunteer instructor)
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
            aria-label="Link to Nathan's React Native Web at Twitter talk on YouTube"
            rel="noopener noreferrer"
            target="_blank"
          >
            React Native Web at Twitter
          </a>
        </li>
      </ul>
      <h2 className="pt-5">Projects:</h2>
      <ul className="pt-4">
        <li>
          <a
            href="https://github.com/nwthomas/gitops"
            aria-label="Link to the Nathan's gitops repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            Local AI models with Kubernetes
          </a>
        </li>
        <li>
          <a
            href="https://github.com/nwthomas/oura-ring-mcp-server"
            aria-label="Link to Nathan's Oura Ring MPC Server repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            Oura Ring MCP Server
          </a>
        </li>
        <li>
          <a
            href="https://github.com/nwthomas/heapq"
            aria-label="Link to Nathan's heapq repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            heapq
          </a>
        </li>
        <li>
          <a
            href="https://github.com/sst/opencode"
            aria-label="Link to the OpenCode repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            OpenCode (contributor)
          </a>
        </li>
      </ul>
      <p className="pt-5">
        You can read my{" "}
        <Link aria-label="Link to Nathan's writing" href="/writing">
          writing
        </Link>
        ,{" "}
        <a
          href="https://nathanthomas.substack.com/"
          aria-label="Link to Nathan's profile on Substack"
          rel="noopener noreferrer"
          target="_blank"
        >
          newsletter
        </a>
        ,{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          code
        </a>
        , or{" "}
        <a
          href="https://x.com/nwthomas"
          aria-label="Link to Nathan's profile on X"
          rel="noopener noreferrer"
          target="_blank"
        >
          follow me online.
        </a>{" "}
        I also angel invest in startups, so please <a href="mailto:contact@nathanthomas.dev">reach out</a> if
        interested.
      </p>
    </section>
  );
}
