import * as Sentry from "@sentry/nextjs";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import * as stylex from "@stylexjs/stylex";
import {
  GITHUB_PROFILE_URL,
  getHourlyContributions,
  type ContributionDay,
  type ContributionWeek,
} from "@/app/utils/github";

const CELL_SIZE = 9;
const CELL_GAP = 2;
const CELL_RADIUS = 1.5;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const DAYS_PER_WEEK = 7;

const BORDER_WIDTH = 1;
const BORDER_INSET = BORDER_WIDTH / 2;

const MONTH_LABEL_HEIGHT = 12;
const MONTH_LABEL_BASELINE = 7;
const MONTH_LABEL_MIN_WEEKS = 2;

function parseDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function getMonthLabels(weeks: ContributionWeek[]) {
  const months = weeks.map((week) => parseDate(week.days[0].date));
  const starts = months.flatMap((month, index) =>
    index === 0 || month.getUTCMonth() !== months[index - 1].getUTCMonth() ? [index] : [],
  );

  return starts
    .filter((weekIndex, index) => (starts[index + 1] ?? weeks.length) - weekIndex >= MONTH_LABEL_MIN_WEEKS)
    .map((weekIndex) => ({
      name: months[weekIndex].toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
      weekIndex,
    }));
}

function formatDayTitle(day: ContributionDay) {
  const label = day.count === 1 ? "contribution" : "contributions";
  return `${day.count === 0 ? "No" : day.count} ${label} on ${day.date}`;
}

export async function GitHubContributions() {
  let weeks: ContributionWeek[] = [];
  try {
    weeks = await getHourlyContributions();
  } catch (error) {
    Sentry.captureException(error);

    // Throwing keeps the last good page; the build and dev have none, so render without the graph
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
      throw error;
    }
  }

  if (!weeks.length) {
    return null;
  }

  const width = weeks.length * CELL_STEP - CELL_GAP;
  const height = MONTH_LABEL_HEIGHT + DAYS_PER_WEEK * CELL_STEP - CELL_GAP;

  return (
    <div {...stylex.props(styles.scroller)}>
      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nathan's GitHub contributions over the past year"
        {...stylex.props(styles.link)}
      >
        <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${width} ${height}`} {...stylex.props(styles.graph)}>
          {getMonthLabels(weeks).map((label) => (
            <text
              key={label.weekIndex}
              x={label.weekIndex * CELL_STEP}
              y={MONTH_LABEL_BASELINE}
              {...stylex.props(styles.monthLabel)}
            >
              {label.name}
            </text>
          ))}
          {weeks.map((week, weekIndex) =>
            week.days.map((day) => (
              <rect
                key={day.date}
                x={weekIndex * CELL_STEP + BORDER_INSET}
                y={MONTH_LABEL_HEIGHT + parseDate(day.date).getUTCDay() * CELL_STEP + BORDER_INSET}
                width={CELL_SIZE - BORDER_WIDTH}
                height={CELL_SIZE - BORDER_WIDTH}
                rx={CELL_RADIUS - BORDER_INSET}
                strokeWidth={BORDER_WIDTH}
                {...stylex.props(styles.cell, levelStyles[day.level])}
              >
                <title>{formatDayTitle(day)}</title>
              </rect>
            )),
          )}
        </svg>
      </a>
    </div>
  );
}

const styles = stylex.create({
  cell: {
    stroke: "var(--contribution-border)",
  },
  graph: {
    display: "block",
    height: "auto",
    width: "100%",
  },
  monthLabel: {
    fill: "var(--foreground-muted)",
    fontSize: 8,
  },
  link: {
    display: "block",
    flexShrink: 0,
    minWidth: "42rem",
    width: "100%",
  },
  scroller: {
    contain: "inline-size",
    display: "flex",
    scrollbarWidth: "none",
    marginBottom: "-0.25rem",
    marginLeft: "-1.25rem",
    marginRight: "-1.25rem",
    marginTop: "1.75rem",
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    paddingBottom: "0.25rem",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    paddingTop: "0.25rem",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const levelStyles = stylex.create({
  0: { fill: "var(--contribution-0)" },
  1: { fill: "var(--contribution-1)" },
  2: { fill: "var(--contribution-2)" },
  3: { fill: "var(--contribution-3)" },
  4: { fill: "var(--contribution-4)" },
});
