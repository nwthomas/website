export function Footer() {
  return (
    <footer className="flex justify-end w-full max-w-2xl mx-5 mt-10">
      <div className="flex gap-3 sm:gap-5 items-center">
        <p className="text-sm text-gray-400">
          Nathan Thomas (
          <a
            className="text-sm no-underline text-foreground"
            href="https://x.com/nwthomas"
            aria-label="Link to Nathan's profile on X"
            rel="noopener noreferrer"
            target="_blank"
          >
            @nwthomas
          </a>
          )
        </p>
        <a
          className="text-sm no-underline ml-auto text-gray-400"
          href="https://github.com/nwthomas/website"
          aria-label="Link to the source repository on GitHub for this website"
          rel="noopener noreferrer"
          target="_blank"
        >
          Source
        </a>
      </div>
    </footer>
  );
}
