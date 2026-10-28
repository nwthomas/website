"use client";

import * as stylex from "@stylexjs/stylex";

import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME } from "@/app/store/reducers/themeSlice";
import { MonitorIcon, MoonIcon, SunIcon } from "@/app/components/Icons";

import { useTheme } from "@/app/hooks/useTheme";

const THEME_OPTIONS = [
  { value: SYSTEM_THEME, label: "System", Icon: MonitorIcon },
  { value: LIGHT_THEME, label: "Light", Icon: SunIcon },
  { value: DARK_THEME, label: "Dark", Icon: MoonIcon },
] as const;

export function ThemeSwitch() {
  const { currentTheme, setCurrentTheme } = useTheme();

  if (currentTheme === null) {
    return <div aria-hidden="true" {...stylex.props(styles.placeholder)} />;
  }

  const currentIndex = THEME_OPTIONS.findIndex(({ value }) => value === currentTheme);
  const currentOption = THEME_OPTIONS[currentIndex];
  const nextOption = THEME_OPTIONS[(currentIndex + 1) % THEME_OPTIONS.length];

  return (
    <button
      aria-label={`${currentOption.label} theme. Switch to ${nextOption.label.toLowerCase()} theme`}
      title={`${currentOption.label} theme`}
      type="button"
      onClick={() => setCurrentTheme(nextOption.value)}
      {...stylex.props(styles.button)}
    >
      {THEME_OPTIONS.map(({ value, Icon }) => (
        <span key={value} {...stylex.props(styles.icon, value !== currentTheme && styles.iconHidden)}>
          <Icon color="currentColor" isAriaHidden style={{ height: 16, width: 16 }} />
        </span>
      ))}
    </button>
  );
}

const styles = stylex.create({
  button: {
    WebkitTapHighlightColor: "transparent",
    borderRadius: 9999,
    alignItems: "center",
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--surface)",
    },
    color: "var(--foreground)",
    cursor: "pointer",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty: "background-color",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    height: 36,
    marginBottom: -4,
    marginTop: -4,
    width: 36,
  },
  icon: {
    display: "flex",
    position: "absolute",
    transform: "rotate(0deg) scale(1)",
    transitionDuration: {
      default: "150ms",
      "@media (prefers-reduced-motion: reduce)": "0ms",
    },
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  placeholder: {
    flexShrink: 0,
    height: 36,
    marginBottom: -4,
    marginTop: -4,
    width: 36,
  },
  iconHidden: {
    transform: "rotate(90deg) scale(0)",
  },
});
