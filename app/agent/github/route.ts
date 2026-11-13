import * as Sentry from "@sentry/nextjs";
import { GITHUB_PROFILE_URL, getHourlyContributions, type ContributionWeek } from "@/app/utils/github";
import { summarizeContributions } from "@/app/utils/webmcp";

export const revalidate = 3600;

export async function GET() {
  let weeks: ContributionWeek[] = [];
  try {
    weeks = await getHourlyContributions();
  } catch (error) {
    Sentry.captureException(error);
  }

  return Response.json({
    profile: GITHUB_PROFILE_URL,
    ...summarizeContributions(weeks.flatMap((week) => week.days)),
  });
}
