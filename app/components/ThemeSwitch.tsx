"use client";

import * as stylex from "@stylexjs/stylex";

import { MonitorIcon, MoonIcon, SunIcon } from "@/app/components/Icons";
import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME } from "@/app/store/reducers/themeSlice";
import { useId } from "react";
import { useTheme } from "@/app/hooks/useTheme";

const THEME_OPTIONS = [
  { value: SYSTEM_THEME, label: "System", Icon: MonitorIcon, color: "#ffffff" },
  { value: DARK_THEME, label: "Dark", Icon: MoonIcon, color: "#A38CF3" },
  { value: LIGHT_THEME, label: "Light", Icon: SunIcon, color: "var(--theme-switch)" },
] as const;

export function ThemeSwitch() {
  const { currentTheme, setCurrentTheme } = useTheme();
  const name = useId();

  return (
    <div role="group" aria-label="Theme" {...stylex.props(styles.container)}>
      {currentTheme !== null ? (
        <div {...stylex.props(styles.track)}>
          {THEME_OPTIONS.map(({ value, label, Icon, color }) => (
            <label key={value} title={`${label} theme`} {...stylex.props(styles.option)}>
              <input
                aria-label={`${label} theme`}
                type="radio"
                name={name}
                value={value}
                checked={currentTheme === value}
                onChange={() => setCurrentTheme(value)}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    if (!event.repeat) {
                      event.currentTarget.click();
                    }
                  }
                }}
                {...stylex.props(styles.input)}
              />
              <Icon color={color} isAriaHidden style={{ height: 15, width: 15 }} />
            </label>
          ))}
          <div
            {...stylex.props(
              styles.knob,
              currentTheme === DARK_THEME && styles.knobDark,
              currentTheme === LIGHT_THEME && styles.knobLight,
            )}
          />
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
  option: {
    WebkitTapHighlightColor: "transparent",
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    height: 22,
    width: 22,
  },
  knob: {
    borderRadius: 9999,
    backgroundColor: "#ffffff",
    boxShadow: "none",
    outlineStyle: "none",
    pointerEvents: "none",
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
  knobDark: {
    transform: "translateX(24px)",
  },
  knobLight: {
    transform: "translateX(48px)",
  },
  track: {
    borderColor: "var(--muted)",
    borderRadius: 9999,
    borderStyle: "solid",
    borderWidth: 2,
    gap: 2,
    alignItems: "center",
    backgroundColor: "#000000",
    display: "flex",
    position: "relative",
    touchAction: "pan-x",
    height: 26,
    paddingLeft: 0,
    paddingRight: 0,
    width: 74,
  },
});
