"use client";

import { memo, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

const COLS = 92;
const ROWS = 38;
const TOTAL = COLS * ROWS;

const DITHER_BASE = "#030303";
const DITHER_FLICKER = "#121212";
const DITHER_CHAR = "·";

function subscribePrefersReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getPrefersReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getPrefersReducedMotionServerSnapshot() {
  return false;
}

type Cell = { kind: "dither" } | { kind: "void" } | { kind: "art"; ch: string };

function pickFlickerSlots(total: number, count: number, allowed: Set<number>): number[] {
  const out: number[] = [];
  const seen = new Set<number>();
  let guard = 0;
  while (out.length < count && guard < count * 120) {
    guard += 1;
    const i = Math.floor(Math.random() * total);
    if (!allowed.has(i) || seen.has(i)) continue;
    seen.add(i);
    out.push(i);
  }
  return out;
}

type FlickerParticle = { id: number; index: number; until: number };

function buildGrid(logo: string, wordmark: string): Cell[] {
  const logoLines = logo.split("\n");
  const wordLines = wordmark.split("\n");
  const logoW = Math.max(...logoLines.map((l) => l.length), 0);
  const wordW = Math.max(...wordLines.map((l) => l.length), 0);
  const gap = 6;
  const blockW = logoW + gap + wordW;
  const startCol = Math.max(0, Math.floor((COLS - blockW) / 2));
  const startRow = Math.max(0, Math.floor((ROWS - Math.max(logoLines.length, wordLines.length)) / 2));

  const grid: Cell[] = Array.from({ length: TOTAL }, () => ({ kind: "dither" as const }));

  const stamp = (lines: string[], row0: number, col0: number) => {
    lines.forEach((line, dr) => {
      const r = row0 + dr;
      if (r < 0 || r >= ROWS) return;
      for (let dc = 0; dc < line.length; dc += 1) {
        const c = col0 + dc;
        if (c < 0 || c >= COLS) continue;
        const ch = line[dc];
        const idx = r * COLS + c;
        if (ch === " ") grid[idx] = { kind: "void" };
        else grid[idx] = { kind: "art", ch };
      }
    });
  };

  stamp(logoLines, startRow, startCol);
  stamp(wordLines, startRow, startCol + logoW + gap);
  return grid;
}

const BaseLayer = memo(function BaseLayer({ grid }: { grid: Cell[] }) {
  return (
    <>
      {grid.map((cell, i) => {
        if (cell.kind === "art") {
          return (
            <span key={i} className="text-neutral-100 select-none" aria-hidden>
              {cell.ch}
            </span>
          );
        }
        if (cell.kind === "void") {
          return (
            <span key={i} className="text-transparent select-none" aria-hidden>
              {"\u00a0"}
            </span>
          );
        }
        return (
          <span key={i} className="select-none" style={{ color: DITHER_BASE }} aria-hidden>
            {DITHER_CHAR}
          </span>
        );
      })}
    </>
  );
});

export function CursorAsciiPanel({
  logo,
  wordmark,
  "aria-label": ariaLabel,
}: {
  logo: string;
  wordmark: string;
  "aria-label": string;
}) {
  const reduceMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    getPrefersReducedMotionServerSnapshot,
  );

  const grid = useMemo(() => buildGrid(logo, wordmark), [logo, wordmark]);

  const ditherSlots = useMemo(() => {
    const s = new Set<number>();
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[i].kind === "dither") s.add(i);
    }
    return s;
  }, [grid]);

  const [particles, setParticles] = useState<FlickerParticle[]>([]);
  const nextId = useRef(0);
  const [frameTime, setFrameTime] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const spawnTick = () => {
      const now = performance.now();
      setParticles((prev) => {
        const alive = prev.filter((p) => p.until > now);
        const taken = new Set<number>();
        for (const p of alive) taken.add(p.index);
        const allowed = new Set<number>();
        for (const idx of ditherSlots) {
          if (!taken.has(idx)) allowed.add(idx);
        }
        const n = 18 + Math.floor(Math.random() * 24);
        const slots = pickFlickerSlots(TOTAL, n, allowed);
        const born = slots.map((index) => {
          nextId.current += 1;
          return {
            id: nextId.current,
            index,
            until: now + 60 + Math.random() * 95,
          } satisfies FlickerParticle;
        });
        return [...alive, ...born].slice(-150);
      });
    };

    const id = window.setInterval(spawnTick, 100);
    spawnTick();
    return () => window.clearInterval(id);
  }, [ditherSlots, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const pulse = () => {
      setFrameTime(performance.now());
    };
    pulse();
    const id = window.setInterval(pulse, 80);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const visible =
    reduceMotion || frameTime === 0 ? [] : particles.filter((p) => p.until > frameTime);

  const fontSize = "clamp(0.5rem, 1.1vw, 0.6875rem)";
  const lineHeight = 1.05;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-black p-6 shadow-lg sm:p-10 select-none"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="mx-auto w-max max-w-full">
        <div
          className="relative grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1ch)`,
            fontSize,
            lineHeight,
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          }}
        >
          <BaseLayer grid={grid} />
          {visible.map((p) => {
            const row = Math.floor(p.index / COLS);
            const col = p.index % COLS;
            return (
              <span
                key={p.id}
                className="pointer-events-none absolute"
                style={{
                  left: `calc(${col} * 1ch)`,
                  top: `calc(${row} * 1em * ${lineHeight})`,
                  color: DITHER_FLICKER,
                  fontSize,
                  lineHeight: `${lineHeight}`,
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                }}
                aria-hidden
              >
                {DITHER_CHAR}
              </span>
            );
          })}
        </div>
      </div>

      <p className="sr-only">
        ASCII art: circular Cursor-style mark and the word cursor in block letters on a black field. The background is a
        grid of near-black dots; a few dots briefly brighten for a subtle temporal dither effect. Respects
        prefers-reduced-motion.
      </p>
    </div>
  );
}
