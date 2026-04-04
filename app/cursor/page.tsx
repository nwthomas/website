import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursor | Nathan Thomas",
  description: "ASCII art homage to the Cursor logo and wordmark",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Cursor",
    description: "ASCII art homage to the Cursor logo and wordmark",
    url: "https://www.nathanthomas.dev/cursor",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

// Isometric cube: top @ (light), left . (dark), right * (mid). Center gap = pointer “cutout” on black.
const LOGO = `
              ########
            ##@@@@@@@@##
          ##@@@@@@@@@@@@##
        ##@@@@@@@@@@@@@@@@##
       ##@@@@@@@@@@@@@@@@@@##
      ##....##########****##
     ##....##        ##****##
    ##....##          ##****##
   ##....##            ##****##
  ##....##              ##****##
 ##....##                ##****##
 ##....##                ##****##
 ##....##                ##****##
 ##....##                ##****##
  ##....##              ##****##
   ##....##            ##****##
    ##....##          ##****##
     ##....##########****##
      ##******************##
       ##****************##
        ##**************##
          ##**********##
            ########
`.trimStart();

// Six uppercase letters, `#` fill, two-space gaps; reads as CURSOR on a black field.
const WORDMARK = `
 ####    #    #  #####   ####    ####   ##### 
#     #  #    #  #    # #    #  #    #  #    #
#        #    #  #    # #       #    #  #    #
#        #    #  #####   ####   #    #  #####
#        #    #  #  #        #  #    #  #  #
#     #  #    #  #   #  #    #  #    #  #   #
 ####     ####   #    #  ####    ####   #    #
`.trimStart();

export default function CursorPage() {
  return (
    <section className="w-full max-w-6xl mx-5">
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        A flat ASCII take on the{" "}
        <a
          href="https://cursor.com"
          className="underline underline-offset-2"
          rel="noopener noreferrer"
          target="_blank"
        >
          Cursor
        </a>{" "}
        cube and wordmark. The cube uses @ on the top, * on the right face, and . on the left; the middle gap is open
        so the black background reads as the cutout.
      </p>
      <div
        className="inline-flex flex-col gap-8 rounded-lg bg-black p-6 text-neutral-200 shadow-lg sm:flex-row sm:items-center sm:gap-10 sm:p-10"
        aria-label="ASCII art: Cursor isometric logo and CURSOR wordmark"
      >
        <pre className="font-mono text-[0.6rem] leading-[1.05] whitespace-pre sm:text-[0.7rem] md:text-sm">
          {LOGO}
        </pre>
        <pre className="font-mono text-[0.55rem] leading-[1.05] whitespace-pre sm:text-[0.65rem] md:text-xs lg:text-sm">
          {WORDMARK}
        </pre>
      </div>
    </section>
  );
}
