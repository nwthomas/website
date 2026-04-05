"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { CURSOR_LOGO_ASCII } from "./cursor-logo-ascii";

const DENSE_CHAR = "█";

export type AsciiCell = {
  value: string;
  isLogo: boolean;
  alive: boolean;
};

const FONT_SIZE_PX = 6;

const BLACK = "#000000";
const ALIVE_BLACK = "#181818";
const LOGO_WHITE = "#f7f7f7";
const LOGO_EDGE_SHADOW_BLUR = 1.15;
const LOGO_EDGE_SHADOW = "rgba(255, 255, 255, 0.42)";

const INITIAL_DENSITY = 0.24;
const SEED_WARMUP_STEPS = 3;
const TICK_MS = 72;

function normalizeLogoLines(raw: string): string[] {
  const lines = raw.split("\n").map((l) => l.replace(/\r/g, ""));
  let top = 0;
  let bottom = lines.length - 1;
  while (top <= bottom && lines[top].trim() === "") top++;
  while (bottom >= top && lines[bottom].trim() === "") bottom--;
  if (top > bottom) return [];
  const slice = lines.slice(top, bottom + 1);
  let minCol = Infinity;
  let maxCol = -1;
  for (const line of slice) {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch !== " " && ch !== "\t") {
        minCol = Math.min(minCol, i);
        maxCol = Math.max(maxCol, i);
      }
    }
  }
  if (minCol === Infinity) return [];
  return slice.map((l) => l.slice(minCol, maxCol + 1));
}

function buildLogoLayout(cols: number, rows: number, logoLines: string[]): { mask: Uint8Array; chars: string[] } {
  const mask = new Uint8Array(cols * rows);
  const chars = new Array<string>(cols * rows).fill(" ");
  if (logoLines.length === 0) return { mask, chars };
  const h = logoLines.length;
  const w = Math.max(...logoLines.map((l) => l.length));
  const padded = logoLines.map((l) => l.padEnd(w, " "));
  const startRow = Math.floor((rows - h) / 2);
  const startCol = Math.floor((cols - w) / 2);
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      const gr = startRow + r;
      const gc = startCol + c;
      if (gr < 0 || gr >= rows || gc < 0 || gc >= cols) continue;
      const ch = padded[r][c];
      if (ch !== " " && ch !== "\t") {
        const idx = gr * cols + gc;
        mask[idx] = 1;
        chars[idx] = ch;
      }
    }
  }
  return { mask, chars };
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

  const [cell, setCell] = useState({ w: 4, h: FONT_SIZE_PX });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const span = measureRef.current;
      if (span) {
        const r = span.getBoundingClientRect();
        setCell({ w: r.width, h: r.height });
      }
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };

    measure();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", measure);
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    return () => {
      vv?.removeEventListener("resize", measure);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

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

  const logoLayout = useMemo(() => {
    if (cols === 0 || rows === 0) return null;
    const lines = normalizeLogoLines(CURSOR_LOGO_ASCII);
    return buildLogoLayout(cols, rows, lines);
  }, [cols, rows]);

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
    const mask = logoLayout?.mask ?? new Uint8Array(size);
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
  }, [cols, rows, logoLayout]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cols === 0 || rows === 0 || !logoLayout) return;

    let cancelled = false;
    let frame = 0;
    const logoMask = logoLayout.mask;
    const logoChars = logoLayout.chars;

    const draw = (alive: Uint8Array, c: number, r: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const cw = cell.w;
      const ch = cell.h;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BLACK;
      ctx.fillRect(0, 0, viewport.w, viewport.h);
      ctx.fillStyle = ALIVE_BLACK;

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
      ctx.font = `${FONT_SIZE_PX}px monospace`;
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

      if (now - tickRef.current < TICK_MS) return;
      tickRef.current = now;

      const next = nextGeneration(g, c, r, logoMask);
      gridRef.current = next;
      draw(next, c, r);
    };

    const g0 = gridRef.current;
    const { cols: c0, rows: r0 } = gridDimsRef.current;
    if (g0 && g0.length === c0 * r0) {
      draw(g0, c0, r0);
    }

    frame = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [cols, rows, cell.w, cell.h, viewport.w, viewport.h, logoLayout]);

  const monoStyle = {
    fontSize: FONT_SIZE_PX,
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
