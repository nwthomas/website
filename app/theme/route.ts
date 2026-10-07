import * as Sentry from "@sentry/nextjs";

import { DARK_THEME, LIGHT_THEME, ThemeEnum } from "@/app/store/reducers/themeSlice";
import { getUserTheme, setUserTheme } from "@/app/utils/db";

import { cookies } from "next/headers";
import { isAllowedOrigin } from "@/app/utils/origin";

const USER_ID_COOKIE = "uid";
const THEME_COOKIE = "theme";
const COOKIE_MAX_AGE_S = 60 * 60 * 24 * 365;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isTheme(value: unknown): value is ThemeEnum {
  return value === DARK_THEME || value === LIGHT_THEME;
}

async function getUserId(): Promise<string | null> {
  const userId = (await cookies()).get(USER_ID_COOKIE)?.value;
  return userId && UUID_REGEX.test(userId) ? userId : null;
}

export async function GET(): Promise<Response> {
  const headers = { "Cache-Control": "no-store" };
  const userId = await getUserId();

  if (!userId) {
    return Response.json({ theme: null }, { headers });
  }

  try {
    return Response.json({ theme: await getUserTheme(userId) }, { headers });
  } catch (error) {
    Sentry.captureException(error);
    return new Response(null, { status: 503, headers });
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return new Response(null, { status: 403 });
  }

  let theme: unknown;
  try {
    theme = (await request.json())?.theme;
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!isTheme(theme)) {
    return new Response(null, { status: 400 });
  }

  const userId = (await getUserId()) ?? crypto.randomUUID();

  try {
    await setUserTheme(userId, theme);
  } catch (error) {
    Sentry.captureException(error);
    return new Response(null, { status: 503 });
  }

  const cookieStore = await cookies();
  const cookieOptions = {
    maxAge: COOKIE_MAX_AGE_S,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };

  cookieStore.set(USER_ID_COOKIE, userId, { ...cookieOptions, httpOnly: true });
  // Readable by the inline script in app/layout.tsx so the theme can be applied before hydration
  cookieStore.set(THEME_COOKIE, theme, cookieOptions);

  return new Response(null, { status: 204 });
}
