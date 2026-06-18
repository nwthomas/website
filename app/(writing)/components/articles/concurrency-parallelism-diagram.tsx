"use client";

import { useRef, useState, type CSSProperties } from "react";

type Segment = {
  height: string;
  offset: string;
  tone: "amber" | "sky";
};

type LaneProps = {
  transitionPhase: "idle" | "toParallelism";
  dimmedTone: Segment["tone"] | null;
  segments: Segment[];
};

const toneClasses: Record<Segment["tone"], string> = {
  amber:
    "border-[#efb3c3] bg-[linear-gradient(180deg,rgba(249,222,230,0.82),rgba(252,236,241,0.96))] dark:border-[#a96578] dark:bg-[linear-gradient(180deg,rgba(86,46,58,0.58),rgba(63,35,44,0.72))]",
  sky: "border-[#b7d97a] bg-[linear-gradient(180deg,rgba(227,241,189,0.82),rgba(240,248,218,0.96))] dark:border-[#7d9750] dark:bg-[linear-gradient(180deg,rgba(58,76,34,0.58),rgba(41,56,24,0.72))]",
};

const concurrencyLanes: Segment[][] = [
  [
    { height: "18%", offset: "4%", tone: "amber" },
    { height: "20%", offset: "23%", tone: "sky" },
    { height: "15%", offset: "47%", tone: "amber" },
    { height: "10%", offset: "73%", tone: "sky" },
    { height: "13%", offset: "85%", tone: "amber" },
  ],
  [
    { height: "16%", offset: "4%", tone: "sky" },
    { height: "18%", offset: "27%", tone: "amber" },
    { height: "8%", offset: "52%", tone: "sky" },
    { height: "18%", offset: "67%", tone: "amber" },
  ],
];

const parallelLanes: Segment[][] = [
  [{ height: "92%", offset: "4%", tone: "amber" }],
  [{ height: "92%", offset: "4%", tone: "sky" }],
];

const views = {
  concurrency: {
    description: "A single worker keeps multiple tasks moving by time-slicing between them.",
    lanes: concurrencyLanes,
    note: "The work alternates between tasks, so progress is interleaved rather than simultaneous.",
    title: "Concurrency",
  },
  parallelism: {
    description: "Independent workers run separate tasks at the same time on different cores.",
    lanes: parallelLanes,
    note: "Each worker stays on its own task, so both jobs advance at the same time.",
    title: "Parallelism",
  },
} as const;

type ViewKey = keyof typeof views;

function DiagramLane({ transitionPhase, dimmedTone, segments }: LaneProps) {
  return (
    <div className="relative h-[18rem] w-[5.1rem] sm:h-[19rem] sm:w-[5.75rem]" role="presentation">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      {segments.map((segment, index) => (
        (() => {
          const isPrimary = index === 0;
          const expanded = transitionPhase === "toParallelism" && isPrimary;
          const hidden = transitionPhase === "toParallelism" && !isPrimary;

          return (
            <div
              key={`${segment.tone}-${segment.offset}-${segment.height}-${index}`}
              className={`absolute left-1/2 -translate-x-1/2 rounded-[0.8rem] border-[2px] shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)] transition-[top,height,width,opacity] duration-[250ms] ease-out ${toneClasses[segment.tone]}`}
              style={{
                top: expanded ? "4%" : segment.offset,
                height: expanded ? "92%" : segment.height,
                width: "100%",
                opacity: hidden ? 0 : dimmedTone === segment.tone ? 0.5 : 1,
              }}
            />
          );
        })()
      ))}
    </div>
  );
}

type PanelProps = {
  transitionPhase: "idle" | "toParallelism";
  dimmedTone: Segment["tone"] | null;
  lanes: Segment[][];
  note: string;
};

function DiagramPanel({ transitionPhase, dimmedTone, lanes, note }: PanelProps) {
  return (
    <section className="flex h-full flex-col rounded-[1.65rem] border border-zinc-200/80 bg-white/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-zinc-800/80 dark:bg-zinc-950/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-4">
      <div className="flex flex-1 items-start justify-center">
        <div className="flex w-full max-w-[22rem] items-end justify-between pt-1 sm:max-w-[24rem]">
          {lanes.map((lane, index) => (
            <DiagramLane key={index} transitionPhase={transitionPhase} dimmedTone={dimmedTone} segments={lane} />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[0.9rem] leading-6 text-zinc-500 dark:text-zinc-400">{note}</p>
    </section>
  );
}

export function ConcurrencyParallelismDiagram() {
  const [activeView, setActiveView] = useState<ViewKey>("concurrency");
  const [displayedView, setDisplayedView] = useState<ViewKey>("concurrency");
  const [dimmedTone, setDimmedTone] = useState<Segment["tone"] | null>(null);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "toParallelism">("idle");
  const transitionTimeoutRef = useRef<number | null>(null);
  const orderedViews: ViewKey[] = ["concurrency", "parallelism"];
  const activeIndex = orderedViews.indexOf(activeView);
  const legendPillClassName =
    "inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-opacity duration-200 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]";
  const taskAStyle: CSSProperties | undefined = dimmedTone === "amber" ? { opacity: 0.7 } : undefined;
  const taskBStyle: CSSProperties | undefined = dimmedTone === "sky" ? { opacity: 0.7 } : undefined;

  const handleViewChange = (nextView: ViewKey) => {
    if (nextView === activeView) {
      return;
    }

    if (transitionTimeoutRef.current != null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    setActiveView(nextView);

    if (displayedView === "concurrency" && nextView === "parallelism") {
      setTransitionPhase("toParallelism");
      transitionTimeoutRef.current = window.setTimeout(() => {
        setDisplayedView("parallelism");
        setTransitionPhase("idle");
        transitionTimeoutRef.current = null;
      }, 250);

      return;
    }

    setDisplayedView(nextView);
    setTransitionPhase("idle");
  };

  return (
    <div className="mb-5 flex w-full justify-center">
      <figure className="mx-5 w-full max-w-2xl overflow-hidden rounded-[1.8rem] border border-zinc-200/90 bg-[linear-gradient(180deg,#fbfbfa_0%,#f6f6f4_100%)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_40px_-28px_rgba(15,23,42,0.22)] dark:border-zinc-800/90 dark:bg-[linear-gradient(180deg,#151515_0%,#101010_100%)] sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div
            aria-label="Choose execution model"
            className="relative inline-grid grid-cols-2 rounded-full border border-zinc-200/90 bg-white/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            role="tablist"
          >
            <span
              aria-hidden
              className="absolute bottom-1 top-1 rounded-full bg-zinc-900 shadow-[0_8px_18px_-12px_rgba(15,23,42,0.55)] transition-transform duration-[250ms] ease-out dark:bg-zinc-100"
              style={{
                left: "0.25rem",
                width: "calc(50% - 0.25rem)",
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
            {orderedViews.map((key) => {
              const selected = activeView === key;

              return (
                <button
                  key={key}
                  aria-selected={selected}
                  className={`relative z-10 rounded-full px-4 py-2 text-[0.84rem] font-medium transition-colors duration-[250ms] focus:outline-none focus-visible:outline-none ${
                    selected
                      ? "text-white dark:text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                  onClick={() => handleViewChange(key)}
                  role="tab"
                  type="button"
                >
                  {views[key].title}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem] font-medium text-zinc-500 dark:text-zinc-400">
            <span
              className={legendPillClassName}
              onMouseEnter={() => setDimmedTone("sky")}
              onMouseLeave={() => setDimmedTone(null)}
              style={taskAStyle}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#efb3c3]" />
              Task A
            </span>
            <span
              className={legendPillClassName}
              onMouseEnter={() => setDimmedTone("amber")}
              onMouseLeave={() => setDimmedTone(null)}
              style={taskBStyle}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#b7d97a]" />
              Task B
            </span>
          </div>
        </div>

        <div className="min-h-[23rem] sm:min-h-[24rem]">
          <div role="tabpanel">
            <DiagramPanel
              transitionPhase={transitionPhase}
              dimmedTone={dimmedTone}
              lanes={views[displayedView].lanes}
              note={views[activeView].note}
            />
          </div>
        </div>
      </figure>
    </div>
  );
}
