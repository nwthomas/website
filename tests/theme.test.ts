import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

// Exercise the actual pre-hydration script, not a copy of its theme logic.
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const script = layout.match(/__html: `([\s\S]*?)`/)?.[1];
assert.ok(script);

function loadTheme(savedTheme: string | null, dark: boolean, storageBlocked = false) {
  const classes = new Set<string>();
  const media = {
    matches: dark,
    addEventListener: (_event: string, listener: () => void) => {
      onChange = listener;
    },
  };
  let onChange = () => {};
  let stored = savedTheme;
  const window = {
    matchMedia: () => media,
    __theme: "",
    __setPreferredTheme: (theme: string) => {
      void theme;
    },
  };
  runInNewContext(script!, {
    window,
    document: {
      documentElement: {
        classList: { add: (value: string) => classes.add(value), remove: (value: string) => classes.delete(value) },
      },
    },
    localStorage: {
      getItem: () => {
        if (storageBlocked) throw new Error("Storage blocked");
        return stored;
      },
      setItem: (_key: string, value: string) => {
        if (storageBlocked) throw new Error("Storage blocked");
        stored = value;
      },
    },
  });
  return {
    window,
    isDark: () => classes.has("dark"),
    stored: () => stored,
    changeOS: (dark: boolean) => {
      media.matches = dark;
      onChange();
    },
  };
}

for (const dark of [false, true]) {
  for (const preference of ["system", "dark", "light", null, "invalid"]) {
    test(`initializes ${preference} with OS dark=${dark}`, () => {
      const app = loadTheme(preference, dark);
      const expected = preference === "dark" || preference === "light" ? preference : "system";
      assert.equal(app.window.__theme, expected);
      assert.equal(app.isDark(), expected === "system" ? dark : expected === "dark");
    });
  }
}

test("system follows OS changes without replacing the stored preference", () => {
  const app = loadTheme("system", false);
  app.changeOS(true);
  assert.equal(app.isDark(), true);
  app.changeOS(false);
  assert.equal(app.isDark(), false);
  assert.equal(app.window.__theme, "system");
  assert.equal(app.stored(), "system");
});

test("explicit preferences ignore OS changes, and switching back to system resolves immediately", () => {
  const app = loadTheme("system", false);
  app.window.__setPreferredTheme("dark");
  app.changeOS(true);
  app.changeOS(false);
  assert.equal(app.isDark(), true);
  assert.equal(app.stored(), "dark");
  app.window.__setPreferredTheme("light");
  app.changeOS(true);
  assert.equal(app.isDark(), false);
  assert.equal(app.stored(), "light");
  app.window.__setPreferredTheme("system");
  assert.equal(app.isDark(), true);
  assert.equal(app.stored(), "system");
});

test("theme selection still works when localStorage is blocked", () => {
  const app = loadTheme(null, true, true);
  assert.equal(app.window.__theme, "system");
  assert.equal(app.isDark(), true);
  app.window.__setPreferredTheme("light");
  assert.equal(app.isDark(), false);
});
