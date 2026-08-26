"use client";

import * as stylex from "@stylexjs/stylex";

import { MoonIcon, SunIcon } from "@/app/components/Icons";

import { DARK_THEME } from "@/app/store/reducers/themeSlice";
import { useRef } from "react";
import { useTheme } from "@/app/hooks/useTheme";

const DARK_MODE_ARIA_LABEL = "Switch to light mode";
const LIGHT_MODE_ARIA_LABEL = "Switch to dark mode";

export function ThemeSwitch() {
  const { currentTheme, setCurrentTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = currentTheme === DARK_THEME;

  const handleThemeSwitchClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    inputRef.current?.focus();
    setCurrentTheme();
  };

  const currentAriaLabel = isDarkMode ? DARK_MODE_ARIA_LABEL : LIGHT_MODE_ARIA_LABEL;

  return (
    <div {...stylex.props(styles.container)}>
      {currentTheme !== null ? (
        <>
          <input
            aria-label={currentAriaLabel}
            type="checkbox"
            defaultChecked={isDarkMode}
            onChange={handleThemeSwitchClick}
            ref={inputRef}
            tabIndex={0}
            {...stylex.props(styles.input)}
          />
          <div
            onClick={handleThemeSwitchClick}
            {...stylex.props(styles.track)}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <MoonIcon color="var(--theme-switch)" style={{ height: 15, width: 15 }} />
            <SunIcon color="var(--theme-switch)" style={{ height: 15, width: 15 }} />
            <div {...stylex.props(styles.knob, !isDarkMode && styles.knobLight)} />
          </div>
        </>
      ) : null}
    </div>
  );
}

const styles = stylex.create({
  container: {
    height: "1.5rem",
    marginBottom: 3,
    width: 50,
  },
  input: {
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    position: "absolute",
    whiteSpace: "nowrap",
    height: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    width: 1,
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
    left: 2,
    top: 2,
    width: 18,
  },
  knobLight: {
    transform: "translateX(1.5rem)",
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
    outlineOffset: {
      default: null,
      ":focus-within": 2,
    },
    outlineStyle: {
      default: "none",
      ":focus-within": "solid",
    },
    outlineWidth: {
      default: 0,
      ":focus-within": 2,
    },
    position: "relative",
    touchAction: "pan-x",
    transitionDuration: "200ms",
    transitionProperty: "box-shadow",
    height: 26,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1,
    width: 50,
  },
});
