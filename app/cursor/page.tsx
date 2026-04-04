import type { Metadata } from "next";
import { CursorAsciiPanel } from "./CursorAsciiPanel";

const DITHER_DOT = "·";

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

// Reference-style shell: light edge (. , ' * /), heavy band (@ # % &). Spaces = true black cutout in the grid.
const LOGO = `
           . ' * / * ' ,           
         , * @ # % & @ * ' .         
       ' / @ % # # % & @ / ' ,       
     , * @ # @ @ @ @ @ # @ * ' .     
    . / @ #           # @ / * '    
   ' * @ #             # @ * ' .   
  , / @ #               # @ / * '  
  * @ #                   # @ * ' 
 ' @ #                     # @ ' .
 * @ #                     # @ * '
' @ #                       # @ ' 
* @ #                       # @ * 
* @ #                       # @ *
' @ #                       # @ '
 * @ #                     # @ * '
 . * @ #                   # @ * ' .
  ' / @ # # # # # # # # # # @ / * '  
   , * @ % # # # # # # # % @ * ' .   
    . ' / @ % & % % & % @ / * ' .    
      , * @ # % % % # @ * ' ,      
        . ' * @ @ @ * ' , .        
          . , ' * ' , .          
`.trimStart();

// Lowercase block “cursor”; mixed glyphs for texture (inverted: reads light on black).
const WORDMARK = `
  @@@      @   @   @@@    @@@    @@@    @@@  
 @   @    @   @  @   @  @   @  @   @  @   @ 
@         @   @  @      @   @  @   @  @   @
@         @   @   @@@   @   @  @@@@@  @@@@@
@         @   @      @  @   @      @  @   @
 @   @    @   @  @   @  @   @  @   @  @   @
  @@@      @@@    @@@    @@@    @@@    @@@  
`.trimStart();

export default function CursorPage() {
  return (
    <section className="w-full max-w-6xl mx-5">
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        Inverted from a classic ASCII reference: light glyphs on a black field built from near-black{" "}
        <span className="whitespace-nowrap">{DITHER_DOT}</span> cells. A few background dots briefly step brighter for
        a temporal dither. Inspired by{" "}
        <a
          href="https://cursor.com"
          className="underline underline-offset-2"
          rel="noopener noreferrer"
          target="_blank"
        >
          Cursor
        </a>
        .
      </p>
      <CursorAsciiPanel
        logo={LOGO}
        wordmark={WORDMARK}
        aria-label="ASCII art: circular Cursor-style mark and the word cursor on a dithered black background"
      />
    </section>
  );
}
