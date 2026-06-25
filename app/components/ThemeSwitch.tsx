"use client";

import { sx } from "@/app/styles/tw.stylex";

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
    <div {...sx("h6 w50 mb3px")}>
      {currentTheme !== null ? (
        <>
          <input
            aria-label={currentAriaLabel}
            type="checkbox"
            defaultChecked={isDarkMode}
            onChange={handleThemeSwitchClick}
            ref={inputRef}
            tabIndex={0}
            {...sx("srOnly outlineNone focusRing")}
          />
          <div
            onClick={handleThemeSwitchClick}
            {...sx(
              "bgBlack border2 borderGray500 roundedFull cursorPointer flex itemsCenter h26 justifyBetween px5 ptPx relative touchPanX w50 focusWithinRing transitionShadow svg15",
            )}
            data-stylex-svg-15
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <MoonIcon color="var(--theme-switch)" />
            <SunIcon color="var(--theme-switch)" />
            <div
              {...sx(
                "bgWhite roundedFull h18 absolute left2px top2px transitionTransform w18 outlineNone selectNone shadowNone",
                !isDarkMode ? "translateX6" : "translateX0",
              )}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
