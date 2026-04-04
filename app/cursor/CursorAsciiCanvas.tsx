"use client";

import { useEffect, useMemo, useState } from "react";

type AsciiCell = {
  id: number;
  row: number;
  col: number;
  value: string;
  displayValue: string;
  isBackground: boolean;
  isLit: boolean;
};

type GridSize = {
  cols: number;
  rows: number;
};

const TICK_MS = 200;
const CHAR_WIDTH_PX = 8;
const CHAR_HEIGHT_PX = 12;
const HORIZONTAL_PADDING = 10;
const VERTICAL_PADDING = 4;
const BACKGROUND_CHARSET = ".,:;`'~_-+=/\\|()[]{}<>*#%@";
const FOREGROUND_FLICKER_CHARSET = ".,:/\\#*+xX";

const ASCII_LOGO = String.raw`
                ,///(#.......
             .(((((((((( .,..../,.
          .///////((///((,  .,,,,,,,
       ,******///////////(,  .,,,,,,,,,,,,
    .,........./////*****         ..,,,,,,,,,,,,,
  ,,,,,,,,                             .,,,,,,,,,,,,,
 ,////////,                                    .,,,,
 ,///////////,                                 .,,,,
 ,//////////,,                                .,,,,,
 ,//////////////,,                            .,,,,,
 ,////////////////,,,,.      **               ,,,,,,,
 ,////////////////,,,****                  .,,,,,,,
 ,////////////////,,,*****               .,,,,,,,,
 .,***************/////*****         *,,,,,,,,,,
 .,,,*(((((((((((((((((((((         (((((((/.    .,,,,,
 .*  *###################*       .###########/   .*.
 . /###################*       /##############* .
    /###########,                /###########*
      ,((((((((((                  ((((((((((
        /,  (&%%&,   ,(%%.
              /(* 

                     .#######,  ,###,      .####      .###################/   .###################*      .###################.    *################.      .###################
                    .###########  ####      .####      &####*****************   &####*****************     *####*****************    #####***************      (####***************
                    #####         .####      .####      &####                    &####                     *####                    #####                     (####                
                    ####*          ####      .####      &####*****************   &####*****************     *####*****************    #####***************      (####***************
                    ####(          ####      .####      &####/////////////////   &####////////////////*     *####////////////////*    #####///////////////      (####///////////////
                    (####         .####      .####      &####                    &####                     *####                    #####                     (####                
                     ############,  ####      .####      &####                    &####*****************     *####*****************    #####*****************      (####                
                      .###########, *####      .####      &####                    &###################,      *###################,    ####################,      (####                
`;

const LOGO_LINES = ASCII_LOGO.split("\n").filter((line) => line.length > 0);
const LOGO_HEIGHT = LOGO_LINES.length;
const LOGO_WIDTH = LOGO_LINES.reduce((max, line) => Math.max(max, line.length), 0);

function randomFromCharset(charset: string): string {
  return charset[Math.floor(Math.random() * charset.length)] ?? ".";
}

function computeGridSize(): GridSize {
  if (typeof window === "undefined") {
    return {
      cols: LOGO_WIDTH + HORIZONTAL_PADDING * 2,
      rows: LOGO_HEIGHT + VERTICAL_PADDING * 2,
    };
  }

  return {
    cols: Math.max(LOGO_WIDTH + HORIZONTAL_PADDING * 2, Math.floor(window.innerWidth / CHAR_WIDTH_PX)),
    rows: Math.max(LOGO_HEIGHT + VERTICAL_PADDING * 2, Math.floor(window.innerHeight / CHAR_HEIGHT_PX)),
  };
}

function buildGrid({ cols, rows }: GridSize): AsciiCell[] {
  const startRow = Math.floor((rows - LOGO_HEIGHT) / 2);
  const startCol = Math.floor((cols - LOGO_WIDTH) / 2);
  const cells: AsciiCell[] = [];
  let id = 0;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const logoRow = row - startRow;
      const logoCol = col - startCol;
      const withinLogoRow = logoRow >= 0 && logoRow < LOGO_HEIGHT;
      const logoLine = withinLogoRow ? LOGO_LINES[logoRow] ?? "" : "";
      const withinLogoCol = logoCol >= 0 && logoCol < logoLine.length;
      const logoChar = withinLogoCol ? logoLine[logoCol] ?? " " : " ";
      const isForeground = logoChar !== " ";
      const value = isForeground ? logoChar : randomFromCharset(BACKGROUND_CHARSET);

      cells.push({
        id,
        row,
        col,
        value,
        displayValue: value,
        isBackground: !isForeground,
        isLit: isForeground,
      });

      id += 1;
    }
  }

  return cells;
}

export function CursorAsciiCanvas() {
  const [gridSize, setGridSize] = useState<GridSize>(() => computeGridSize());
  const [cells, setCells] = useState<AsciiCell[]>(() => buildGrid(computeGridSize()));

  useEffect(() => {
    const handleResize = () => {
      const nextSize = computeGridSize();
      setGridSize(nextSize);
      setCells(buildGrid(nextSize));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCells((previousCells) =>
        previousCells.map((cell) => {
          const chance = cell.isBackground ? 0.12 : 0.22;
          const shouldFlicker = Math.random() < chance;

          if (!shouldFlicker) {
            if (cell.isBackground) {
              if (cell.displayValue === cell.value) {
                return cell;
              }

              return {
                ...cell,
                displayValue: cell.value,
                isLit: false,
              };
            }

            if (cell.displayValue === cell.value && cell.isLit) {
              return cell;
            }

            return {
              ...cell,
              displayValue: cell.value,
              isLit: true,
            };
          }

          if (cell.isBackground) {
            return {
              ...cell,
              displayValue: randomFromCharset(BACKGROUND_CHARSET),
              isLit: false,
            };
          }

          return {
            ...cell,
            displayValue: Math.random() < 0.22 ? randomFromCharset(FOREGROUND_FLICKER_CHARSET) : cell.value,
            isLit: true,
          };
        }),
      );
    }, TICK_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const rows = useMemo(() => {
    const rowGroups: AsciiCell[][] = [];

    for (let index = 0; index < cells.length; index += gridSize.cols) {
      rowGroups.push(cells.slice(index, index + gridSize.cols));
    }

    return rowGroups;
  }, [cells, gridSize.cols]);

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
      <pre
        aria-label="Cursor ASCII logo with dither flicker effect"
        className="font-mono text-[6px] leading-[1] select-none sm:text-[8px] md:text-[10px]"
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="h-[1em]">
            {row.map((cell) => (
              <span key={cell.id} style={{ color: cell.isBackground || !cell.isLit ? "#000000" : "#ffffff" }}>
                {cell.displayValue}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </section>
  );
}
