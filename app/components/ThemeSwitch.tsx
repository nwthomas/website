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
    icon: <MonitorIcon color="var(--theme-switch-system)" style={{ height: 15, width: 15 }} />,
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
    height: 26,
    marginBottom: 3,
    width: 74,
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
    height: 18,
    left: 4,
    top: 4,
    width: 18,
  },
  knobDark: {
    transform: "translateX(22px)",
  },
  knobLight: {
    transform: "translateX(44px)",
  },
  knobSystem: {
    transform: "translateX(0)",
  },
  option: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    height: 18,
    paddingLeft: 0,
    paddingRight: 0,
    width: 22,
  },
  track: {
    borderColor: "var(--muted)",
    borderRadius: 9999,
    borderStyle: "solid",
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#000000",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    touchAction: "pan-x",
    transitionDuration: "200ms",
    transitionProperty: "box-shadow",
    height: 26,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    width: 74,
  },
});
