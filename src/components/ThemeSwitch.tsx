"use client";

import { MoonIcon, SunIcon } from "@/components/Icons";
import { createRef, useState } from "react";

// import { DARK_THEME } from "../store/reducers/themeSlice";
// import { useTheme } from "../hooks";

const DARK_MODE_ARIA_LABEL = "Switch to light mode";
const LIGHT_MODE_ARIA_LABEL = "Switch to dark mode";

export function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  //   const [currentTheme, setCurrentTheme] = useTheme();
  const inputRef = createRef<HTMLInputElement>();
  // const isDarkMode = true;

  const handleThemeSwitchClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    inputRef.current?.focus();
    setIsDarkMode(!isDarkMode);
    // setCurrentTheme();
  };

  const currentAriaLabel = isDarkMode ? DARK_MODE_ARIA_LABEL : LIGHT_MODE_ARIA_LABEL;

  return (
    <div className="h-6 w-50px mb-3px">
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
          className="bg-black border-2 border-gray-500 rounded-full cursor-pointer flex items-center h-[26px] justify-between px-[5px] pt-px relative touch-pan-x w-[50px] focus-within:outline focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 [&>svg]:h-[15px] [&>svg]:w-[15px]"
        >
          <MoonIcon color="var(--theme-switch)" />
          <SunIcon color="var(--theme-switch)" />
          <div
            className={`bg-white rounded-full h-[18px] absolute left-[2px] top-[2px] transition-transform duration-200 ease-out w-[18px] ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </>
    </div>
  );
}
