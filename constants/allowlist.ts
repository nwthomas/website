import dotenv from "dotenv";
dotenv.config();

export const ALLOWLIST = ["https://www.nathanthomas.dev"];
if (process.env.DEV_ENV === "development") {
  ALLOWLIST.push("http://localhost:3000");
}
