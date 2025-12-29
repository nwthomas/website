"use client";

import { MoonIcon, SunIcon } from "@/app/components/Icons";

import { DARK_THEME } from "@/store/reducers/themeSlice";
import { useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

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
    <div className="h-6 w-[50px] mb-[3px]">
      {currentTheme !== null ? (
        <>
          <input
            aria-label={currentAriaLabel}
            type="checkbox"
            defaultChecked={isDarkMode}
            onChange={handleThemeSwitchClick}
            ref={inputRef}
            tabIndex={0}
            className="sr-only focus:outline-none active:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          />
          <div
            onClick={handleThemeSwitchClick}
            className="bg-black border-2 border-gray-500 rounded-full cursor-pointer flex items-center h-[26px] justify-between px-[5px] pt-px relative touch-pan-x w-[50px] focus-within:outline focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-shadow duration-200 [&>svg]:h-[15px] [&>svg]:w-[15px] active:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <MoonIcon color="var(--theme-switch)" />
            <SunIcon color="var(--theme-switch)" />
            <div
              className={`bg-white rounded-full h-[18px] absolute left-[2px] top-[2px] transition-transform duration-200 ease-out w-[18px] outline-none active:outline-none focus:outline-none select-none touch-action-none shadow-none active:shadow-none ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
