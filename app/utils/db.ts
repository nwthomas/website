import postgres, { Sql } from "postgres";

import { DATABASE_URL } from "./constants";
import type { ThemeEnum } from "@/app/store/reducers/themeSlice";

// Cache the client on globalThis so hot reloads in development don't open new connection pools
const globalForDb = globalThis as unknown as { sql?: Sql };

// Unlike the Redis singleton, this does not throw at import time so builds without DATABASE_URL still succeed
function getSql(): Sql {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!globalForDb.sql) {
    globalForDb.sql = postgres(DATABASE_URL, { max: 5 });
  }

  return globalForDb.sql;
}

export async function getUserTheme(userId: string): Promise<ThemeEnum | null> {
  const rows = await getSql()<{ theme: ThemeEnum | null }[]>`
    SELECT theme FROM users WHERE id = ${userId}
  `;

  return rows[0]?.theme ?? null;
}

export async function setUserTheme(userId: string, theme: ThemeEnum): Promise<void> {
  await getSql()`
    INSERT INTO users (id, theme)
    VALUES (${userId}, ${theme})
    ON CONFLICT (id) DO UPDATE SET theme = EXCLUDED.theme, updated_at = now()
  `;
}
