import dotenv from "dotenv";
dotenv.config();

export const ALLOWLIST = ["https://www.nathanthomas.dev"];
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "") {
  ALLOWLIST.push("http://localhost:3000");
}
