"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { CURSOR_LOGO_FRAMES, FRAME_COUNT, FRAME_FPS } from "./cursor-logo-frames";
import { CURSOR_TEXT_ASCII } from "./cursor-text-ascii";

const DENSE_CHAR = "█";

export type AsciiCell = {
  value: string;
  isLogo: boolean;
  alive: boolean;
};

/** Smaller viewports use smaller monospace cells so the logo scales down with width. */
function fontSizePxForViewportWidth(w: number): number {
  if (w <= 0) return 6;
  const maxFs = 6;
  const minFs = 3;
  const wide = 1200;
  const narrow = 400;
  if (w >= wide) return maxFs;
  if (w <= narrow) return minFs;
  return minFs + ((w - narrow) / (wide - narrow)) * (maxFs - minFs);
}

const BLACK = "#000000";
const ALIVE_COLOR = "#181818";
const LOGO_WHITE = "#f7f7f7";
const LOGO_EDGE_SHADOW_BLUR = 1.15;
const LOGO_EDGE_SHADOW = "rgba(255, 255, 255, 0.42)";

const INITIAL_DENSITY = 0.24;
const SEED_WARMUP_STEPS = 3;
const TICK_MS = 72;

const INJECT_EVERY_N_TICKS = 35;
const REGION_SIZE = 32;
const LOW_DENSITY_THRESHOLD = 0.08;
const PATTERNS_PER_REGION = 5;

const PATTERNS: number[][][] = [
  [[0,1],[1,2],[2,0],[2,1],[2,2]],                         // glider
  [[0,0],[0,1],[0,2]],                                     // blinker
  [[0,0],[0,1],[1,0],[1,1]],                                // block (still life)
  [[0,0],[1,0],[1,1],[2,1],[2,2]],                          // r-pentomino (long-lived chaos)
  [[0,0],[0,1],[0,2],[0,3]],                                // row-4 (becomes beehive pair)
  [[0,2],[1,0],[1,2],[2,1],[2,2]],                          // glider (mirrored)
  [[0,0],[0,1],[0,2],[1,2],[2,2]],                          // L-triomino growth
  [[0,1],[0,2],[1,0],[1,1],[2,1]],                          // f-pentomino
  [[0,0],[0,1],[0,2],[0,3],[0,4]],                          // row-5 (traffic light oscillator)
  [[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[2,2]],              // U-shape
];

/** Nearest-neighbor downsample of the logo to fit within maxCols × maxRows. Never scales up. */
function scaleLogoLines(lines: string[], maxCols: number, maxRows: number): string[] {
  if (lines.length === 0) return lines;
  const h = lines.length;
  const w = Math.max(...lines.map((l) => l.length));
  if (w === 0 || w <= maxCols && h <= maxRows) return lines;

  const scale = Math.min(maxCols / w, maxRows / h, 1);
  if (scale >= 1) return lines;

  const newW = Math.max(1, Math.round(w * scale));
  const newH = Math.max(1, Math.round(h * scale));
  const padded = lines.map((l) => l.padEnd(w, " "));

  const result: string[] = [];
  for (let r = 0; r < newH; r++) {
    const srcR = Math.min(Math.floor(r / scale), h - 1);
    let row = "";
    for (let c = 0; c < newW; c++) {
      const srcC = Math.min(Math.floor(c / scale), w - 1);
      row += padded[srcR][srcC];
    }
    result.push(row);
  }
  return result;
}

type PlannedPattern = number[];

/**
 * Scans the grid in REGION_SIZE×REGION_SIZE blocks and returns a shuffled list
 * of pattern placements (as flat arrays of grid indices) for every low-density
 * region. The caller drains this queue gradually across subsequent ticks.
 */
function planInjections(grid: Uint8Array, cols: number, rows: number, logoMask: Uint8Array): PlannedPattern[] {
  const placements: PlannedPattern[] = [];

  for (let br = 0; br < rows; br += REGION_SIZE) {
    for (let bc = 0; bc < cols; bc += REGION_SIZE) {
      const rEnd = Math.min(br + REGION_SIZE, rows);
      const cEnd = Math.min(bc + REGION_SIZE, cols);
      const area = (rEnd - br) * (cEnd - bc);

      let alive = 0;
      for (let r = br; r < rEnd; r++) {
        for (let c = bc; c < cEnd; c++) {
          alive += grid[r * cols + c];
        }
      }

      if (alive / area >= LOW_DENSITY_THRESHOLD) continue;

      const margin = 6;
      const rRange = Math.max(1, rEnd - br - margin);
      const cRange = Math.max(1, cEnd - bc - margin);

      for (let p = 0; p < PATTERNS_PER_REGION; p++) {
        const pat = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        const pr = br + Math.floor(Math.random() * rRange);
        const pc = bc + Math.floor(Math.random() * cRange);
        const cells: number[] = [];
        for (const [dr, dc] of pat) {
          const r = pr + dr;
          const c = pc + dc;
          if (r >= 0 && r < rows && c >= 0 && c < cols) {
            const idx = r * cols + c;
            if (!logoMask[idx]) cells.push(idx);
          }
        }
        if (cells.length > 0) placements.push(cells);
      }
    }
  }

  for (let i = placements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [placements[i], placements[j]] = [placements[j], placements[i]];
  }

  return placements;
}

function applyPattern(grid: Uint8Array, pattern: PlannedPattern): void {
  for (const idx of pattern) {
    grid[idx] = 1;
  }
}

function nextGeneration(current: Uint8Array, cols: number, rows: number, logoMask: Uint8Array): Uint8Array {
  const next = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (logoMask[idx]) {
        next[idx] = 0;
        continue;
      }
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = (r + dr + rows) % rows;
          const nc = (c + dc + cols) % cols;
          neighbors += current[nr * cols + nc];
        }
      }
      const cur = current[idx];
      if (cur) {
        next[idx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        next[idx] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  return next;
}

export function CursorAsciiFill() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<Uint8Array | null>(null);
  const gridDimsRef = useRef({ cols: 0, rows: 0 });
  const tickRef = useRef(0);
  const genRef = useRef(0);
  const injectQueueRef = useRef<PlannedPattern[]>([]);

  const [fontSizePx, setFontSizePx] = useState(6);
  const [cell, setCell] = useState({ w: 4, h: 6 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const measureViewport = () => {
      const w = window.innerWidth;
      setFontSizePx(fontSizePxForViewportWidth(w));
      setViewport({ w, h: window.innerHeight });
    };

    measureViewport();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", measureViewport);
    window.addEventListener("resize", measureViewport);
    const ro = new ResizeObserver(measureViewport);
    ro.observe(document.documentElement);

    return () => {
      vv?.removeEventListener("resize", measureViewport);
      window.removeEventListener("resize", measureViewport);
      ro.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const span = measureRef.current;
    if (!span) return;
    const r = span.getBoundingClientRect();
    setCell({ w: r.width, h: r.height });
  }, [fontSizePx]);

  useLayoutEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = BLACK;
    document.documentElement.style.backgroundColor = BLACK;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  const { cols, rows } = useMemo(() => {
    if (cell.w <= 0 || cell.h <= 0 || viewport.w <= 0 || viewport.h <= 0) {
      return { cols: 0, rows: 0 };
    }
    return {
      cols: Math.max(1, Math.ceil(viewport.w / cell.w)),
      rows: Math.max(1, Math.ceil(viewport.h / cell.h)),
    };
  }, [cell, viewport]);

  const composedFrames = useMemo(() => {
    return CURSOR_LOGO_FRAMES.map((frameLines) => {
      const composed: string[] = [];
      const len = Math.max(frameLines.length, CURSOR_TEXT_ASCII.length);
      for (let i = 0; i < len; i++) {
        const fl = frameLines[i] ?? "";
        const tl = CURSOR_TEXT_ASCII[i] ?? "";
        composed.push(fl + tl);
      }
      return composed;
    });
  }, []);

  const frameIndexRef = useRef(0);
  const frameTickRef = useRef(0);

  const logoData = useMemo(() => {
    if (cols === 0 || rows === 0 || cell.w <= 0 || cell.h <= 0) return null;

    // Find union bounding box across all composed frames
    let bbTop = Infinity, bbBottom = -1, bbLeft = Infinity, bbRight = -1;
    for (const frame of composedFrames) {
      for (let r = 0; r < frame.length; r++) {
        for (let c = 0; c < frame[r].length; c++) {
          if (frame[r][c] !== " ") {
            bbTop = Math.min(bbTop, r);
            bbBottom = Math.max(bbBottom, r);
            bbLeft = Math.min(bbLeft, c);
            bbRight = Math.max(bbRight, c);
          }
        }
      }
    }
    if (bbBottom < 0) return null;

    // Trim all frames to the union bounding box for consistent sizing
    const trimmedFrames = composedFrames.map((frame) => {
      const result: string[] = [];
      for (let r = bbTop; r <= bbBottom; r++) {
        const line = frame[r] ?? "";
        result.push(line.substring(bbLeft, bbRight + 1));
      }
      return result;
    });

    const vw = viewport.w;
    const fillW = vw >= 1200 ? 0.85 : vw <= 480 ? 0.4 : 0.4 + ((vw - 480) / (1200 - 480)) * 0.45;
    const fillH = Math.min(0.7, fillW);
    const maxCols = Math.max(1, Math.floor((vw * fillW) / cell.w));
    const maxRows = Math.max(1, Math.floor((viewport.h * fillH) / cell.h));

    const scaledFrames = trimmedFrames.map((lines) =>
      scaleLogoLines(lines, maxCols, maxRows),
    );

    // All scaled frames share dimensions from the first
    const refFrame = scaledFrames[0];
    const h = refFrame.length;
    const w = Math.max(...refFrame.map((l) => l.length));
    const startRow = Math.floor((rows - h) / 2);
    const startCol = Math.floor((cols - w) / 2);

    // Build super mask (union of all frames) and per-frame char maps
    const mask = new Uint8Array(cols * rows);
    const allFrameChars: string[][] = [];

    for (const scaled of scaledFrames) {
      const chars = new Array<string>(cols * rows).fill(" ");
      const padded = scaled.map((l) => l.padEnd(w, " "));
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          const gr = startRow + r;
          const gc = startCol + c;
          if (gr >= 0 && gr < rows && gc >= 0 && gc < cols) {
            const ch = padded[r][c];
            const idx = gr * cols + gc;
            chars[idx] = ch;
            if (ch !== " " && ch !== "\t") {
              mask[idx] = 1;
            }
          }
        }
      }
      allFrameChars.push(chars);
    }

    return { mask, frameChars: allFrameChars };
  }, [cols, rows, cell.w, cell.h, viewport.w, viewport.h, composedFrames]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewport.w <= 0 || viewport.h <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(viewport.w * dpr);
    canvas.height = Math.round(viewport.h * dpr);
    canvas.style.width = `${viewport.w}px`;
    canvas.style.height = `${viewport.h}px`;
  }, [viewport.w, viewport.h]);

  useLayoutEffect(() => {
    if (cols === 0 || rows === 0) {
      gridRef.current = null;
      gridDimsRef.current = { cols: 0, rows: 0 };
      return;
    }
    const size = cols * rows;
    const mask = logoData?.mask ?? new Uint8Array(size);
    let arr: Uint8Array = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      if (mask[i]) arr[i] = 0;
      else arr[i] = Math.random() < INITIAL_DENSITY ? 1 : 0;
    }
    for (let s = 0; s < SEED_WARMUP_STEPS; s++) {
      arr = nextGeneration(arr, cols, rows, mask);
    }
    gridRef.current = arr;
    gridDimsRef.current = { cols, rows };
    tickRef.current = performance.now();
    genRef.current = 0;
    frameIndexRef.current = 0;
    frameTickRef.current = 0;
  }, [cols, rows, logoData]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cols === 0 || rows === 0 || !logoData) return;

    let cancelled = false;
    let frame = 0;
    const logoMask = logoData.mask;
    const FRAME_INTERVAL = 1000 / FRAME_FPS;

    const draw = (alive: Uint8Array, c: number, r: number, logoChars: string[]) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const cw = cell.w;
      const ch = cell.h;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BLACK;
      ctx.fillRect(0, 0, viewport.w, viewport.h);
      ctx.fillStyle = ALIVE_COLOR;

      for (let row = 0; row < r; row++) {
        for (let col = 0; col < c; col++) {
          const idx = row * c + col;
          if (logoMask[idx]) continue;
          if (alive[idx]) {
            ctx.fillRect(col * cw, row * ch, cw, ch);
          }
        }
      }

      ctx.save();
      ctx.font = `${fontSizePx}px monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.shadowColor = LOGO_EDGE_SHADOW;
      ctx.shadowBlur = LOGO_EDGE_SHADOW_BLUR;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = LOGO_WHITE;
      for (let row = 0; row < r; row++) {
        for (let col = 0; col < c; col++) {
          const idx = row * c + col;
          if (!logoMask[idx]) continue;
          const glyph = logoChars[idx];
          if (glyph && glyph !== " ") {
            ctx.fillText(glyph, col * cw, row * ch + 0.35);
          }
        }
      }
      ctx.restore();
    };

    const loop = (now: number) => {
      if (cancelled) return;
      frame = requestAnimationFrame(loop);

      const g = gridRef.current;
      const { cols: c, rows: r } = gridDimsRef.current;
      if (!g || g.length !== c * r || c === 0 || r === 0) return;

      let needsRedraw = false;

      // Advance animation frame at video fps
      if (now - frameTickRef.current >= FRAME_INTERVAL) {
        frameTickRef.current = now;
        frameIndexRef.current = (frameIndexRef.current + 1) % FRAME_COUNT;
        needsRedraw = true;
      }

      // Advance Game of Life at its own tick rate
      if (now - tickRef.current >= TICK_MS) {
        tickRef.current = now;

        const next = nextGeneration(g, c, r, logoMask);
        genRef.current++;

        if (genRef.current % INJECT_EVERY_N_TICKS === 0) {
          const planned = planInjections(next, c, r, logoMask);
          injectQueueRef.current.push(...planned);
        }

        const queue = injectQueueRef.current;
        if (queue.length > 0) {
          const ticksLeft = INJECT_EVERY_N_TICKS - (genRef.current % INJECT_EVERY_N_TICKS);
          const perTick = Math.max(1, Math.ceil(queue.length / ticksLeft));
          const batch = queue.splice(0, perTick);
          for (const pat of batch) {
            applyPattern(next, pat);
          }
        }

        gridRef.current = next;
        needsRedraw = true;
      }

      if (needsRedraw) {
        const currentChars = logoData.frameChars[frameIndexRef.current];
        draw(gridRef.current!, c, r, currentChars);
      }
    };

    const g0 = gridRef.current;
    const { cols: c0, rows: r0 } = gridDimsRef.current;
    if (g0 && g0.length === c0 * r0) {
      draw(g0, c0, r0, logoData.frameChars[0]);
    }

    frame = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [cols, rows, cell.w, cell.h, viewport.w, viewport.h, logoData, fontSizePx]);

  const monoStyle = {
    fontSize: fontSizePx,
    lineHeight: 1,
    letterSpacing: 0,
    color: BLACK,
    backgroundColor: BLACK,
    WebkitFontSmoothing: "none" as const,
    MozOsxFontSmoothing: "grayscale" as const,
  };

  return (
    <>
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-[-9999px] font-mono select-none"
        style={monoStyle}
      >
        {DENSE_CHAR}
      </span>
      <canvas ref={canvasRef} className="fixed inset-0 z-50 m-0 block cursor-text" />
    </>
  );
}
