import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import mdx from "@mdx-js/rollup";

/** Nitro <3.0.0 stable used `{ config: { preset } }`; 3.0.260311-beta+ merges NitroConfig into the plugin root. */
const nitroOptions = process.env.VERCEL ? { preset: "vercel" as const } : {};

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    { enforce: "pre", ...mdx({ jsxImportSource: "react" }) },
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      prerender: {
        enabled: false,
      },
    }),
    viteReact(),
    nitro(nitroOptions),
  ],
});
