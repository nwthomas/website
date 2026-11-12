import { GITHUB_CONTRIBUTIONS_TTL_S, getGitHubContributionsRedisKey, redis } from "@/app/utils/redis";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

type GitHubContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

type GitHubContributionsResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: GitHubContributionLevel;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const GITHUB_USERNAME = "nwthomas";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_REQUEST_TIMEOUT_MS = 3000;

// Defaults to the past year, like the profile graph
const CONTRIBUTIONS_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const CONTRIBUTION_LEVELS: Record<GitHubContributionLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function getContributions(token: string, login = GITHUB_USERNAME): Promise<ContributionWeek[]> {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed (${res.status})`);
  }

  const data = (await res.json()) as GitHubContributionsResponse;
  if (data.errors?.length) {
    throw new Error(`GitHub request failed (${data.errors.map((e) => e.message).join("; ")})`);
  }

  const weeks = data.data?.user?.contributionsCollection.contributionCalendar.weeks ?? [];
  return weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: CONTRIBUTION_LEVELS[day.contributionLevel] ?? 0,
    })),
  }));
}

export async function getHourlyContributions(): Promise<ContributionWeek[]> {
  if (process.env.NODE_ENV === "production") {
    const cachedWeeks = await redis.get<ContributionWeek[]>(getGitHubContributionsRedisKey());
    if (cachedWeeks?.length) {
      return cachedWeeks;
    }
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return [];
  }

  const weeks = await getContributions(token);

  if (process.env.NODE_ENV === "production" && weeks.length) {
    await redis.set(getGitHubContributionsRedisKey(), weeks, GITHUB_CONTRIBUTIONS_TTL_S);
  }

  return weeks;
}
