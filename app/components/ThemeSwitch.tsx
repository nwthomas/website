"use client";

import * as stylex from "@stylexjs/stylex";

import { MonitorIcon, MoonIcon, SunIcon } from "@/app/components/Icons";

import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, ThemeEnum } from "@/app/store/reducers/themeSlice";
import type { ReactNode } from "react";
import { useTheme } from "@/app/hooks/useTheme";

const THEME_OPTIONS: Array<{
  ariaLabel: string;
  theme: ThemeEnum;
  icon: ReactNode;
}> = [
  {
    ariaLabel: "Use system theme",
    theme: SYSTEM_THEME,
    icon: <MonitorIcon color="var(--theme-switch-system)" style={{ height: 18, width: 18 }} />,
  },
  {
    ariaLabel: "Switch to dark mode",
    theme: DARK_THEME,
    icon: <MoonIcon color="var(--theme-switch-moon)" style={{ height: 15, width: 15 }} />,
  },
  {
    ariaLabel: "Switch to light mode",
    theme: LIGHT_THEME,
    icon: <SunIcon color="var(--theme-switch)" style={{ height: 15, width: 15 }} />,
  },
];

export function ThemeSwitch() {
  const { currentTheme, setCurrentTheme } = useTheme();
  const activeTheme = currentTheme ?? SYSTEM_THEME;

  return (
    <div {...stylex.props(styles.container)}>
      {currentTheme !== null ? (
        <div aria-label="Theme preference" role="group" {...stylex.props(styles.track)}>
          <div
            aria-hidden="true"
            {...stylex.props(
              styles.knob,
              activeTheme === SYSTEM_THEME && styles.knobSystem,
              activeTheme === DARK_THEME && styles.knobDark,
              activeTheme === LIGHT_THEME && styles.knobLight,
            )}
          />
          {THEME_OPTIONS.map((option) => (
            <button
              aria-pressed={activeTheme === option.theme}
              aria-label={option.ariaLabel}
              key={option.theme}
              onClick={() => setCurrentTheme(option.theme)}
              type="button"
              {...stylex.props(styles.option)}
            >
              {option.icon}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const styles = stylex.create({
  container: {
    borderRadius: 9999,
    outlineColor: "#0000ff",
    outlineOffset: 0,
    outlineStyle: {
      default: "none",
      ":focus-within": "solid",
    },
    outlineWidth: 2,
    height: 48,
    marginBottom: 0,
    width: 120,
  },
  knob: {
    borderRadius: 9999,
    backgroundColor: "#ffffff",
    boxShadow: "none",
    outlineStyle: "none",
    position: "absolute",
    touchAction: "none",
    transform: "translateX(0)",
    transitionDuration: "200ms",
    transitionProperty: "transform",
    transitionTimingFunction: "ease-out",
    userSelect: "none",
    zIndex: 2,
    height: 40,
    left: 4,
    top: 4,
    width: 40,
  },
  knobDark: {
    transform: "translateX(38px)",
  },
  knobLight: {
    transform: "translateX(76px)",
  },
  knobSystem: {
    transform: "translateX(0)",
  },
  option: {
    borderStyle: "none",
    borderWidth: 0,
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    outlineStyle: "none",
    position: "relative",
    userSelect: "none",
    zIndex: 0,
    height: 40,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    width: 38,
  },
  track: {
    borderColor: "var(--muted)",
    borderRadius: 9999,
    borderStyle: "solid",
    borderWidth: 2,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#000000",
    cursor: "pointer",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    position: "relative",
    touchAction: "pan-x",
    transitionDuration: "200ms",
    transitionProperty: "box-shadow",
    height: 48,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    width: 120,
  },
});
