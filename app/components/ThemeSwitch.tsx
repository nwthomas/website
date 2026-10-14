"use client";

import * as stylex from "@stylexjs/stylex";

import { MoonIcon, SunIcon, SystemIcon } from "@/app/components/Icons";

import { useTheme } from "@/app/hooks/useTheme";
import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, type ThemePreference } from "@/app/store/reducers/themeSlice";

const THEME_OPTIONS = [
  {
    ariaLabel: "Switch to system theme",
    color: "var(--muted)",
    Icon: SystemIcon,
    themePreference: SYSTEM_THEME,
  },
  {
    ariaLabel: "Switch to dark mode",
    color: "#8b5cf6",
    Icon: MoonIcon,
    themePreference: DARK_THEME,
  },
  {
    ariaLabel: "Switch to light mode",
    color: "#facf3d",
    Icon: SunIcon,
    themePreference: LIGHT_THEME,
  },
] as const satisfies ReadonlyArray<{
  ariaLabel: string;
  color: string;
  Icon: typeof MoonIcon;
  themePreference: ThemePreference;
}>;

export function ThemeSwitch() {
  const { currentTheme, currentThemePreference, setCurrentThemePreference } = useTheme();

  if (currentTheme === null || currentThemePreference === null) {
    return null;
  }

  const activeIndex = THEME_OPTIONS.findIndex((option) => option.themePreference === currentThemePreference);

  return (
    <div {...stylex.props(styles.container)}>
      <div
        aria-label="Theme selector"
        role="group"
        {...stylex.props(styles.track)}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div
          aria-hidden="true"
          {...stylex.props(
            styles.knobBase,
            activeIndex === 1 && styles.knobMiddle,
            activeIndex === 2 && styles.knobRight,
          )}
        />
        {THEME_OPTIONS.map(({ Icon, ariaLabel, color, themePreference }) => {
          const isSelected = themePreference === currentThemePreference;

          return (
            <button
              aria-pressed={isSelected}
              aria-label={ariaLabel}
              key={themePreference}
              onClick={(event) => {
                event.stopPropagation();
                setCurrentThemePreference(themePreference);
              }}
              type="button"
              {...stylex.props(styles.option)}
            >
              <Icon color={color} style={{ height: 15, width: 15 }} />
            </button>
          );
        })}
      </div>
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
    width: 76,
  },
  knobBase: {
    backgroundColor: "#ffffff",
    borderRadius: 9999,
    boxShadow: "none",
    height: 18,
    left: 2,
    position: "absolute",
    top: 2,
    transform: "translateX(0)",
    transitionDuration: "200ms",
    transitionProperty: "transform",
    transitionTimingFunction: "ease-out",
    userSelect: "none",
    width: 18,
    zIndex: 0,
  },
  knobMiddle: {
    transform: "translateX(1.5rem)",
  },
  knobRight: {
    transform: "translateX(3rem)",
  },
  option: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    flex: 1,
    height: 22,
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },
  track: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderColor: "var(--muted)",
    borderRadius: 9999,
    borderStyle: "solid",
    borderWidth: 2,
    cursor: "pointer",
    display: "flex",
    height: 26,
    justifyContent: "space-between",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 1,
    position: "relative",
    touchAction: "pan-x",
    transitionDuration: "200ms",
    transitionProperty: "box-shadow",
    width: 76,
  },
});
