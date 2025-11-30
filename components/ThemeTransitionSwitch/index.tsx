import { MoonIcon, SunIcon } from "../Icons";

import { DARK_THEME } from "../../store/reducers/themeSlice";
import { createRef } from "react";
import styled from "@emotion/styled";
import { useTheme as useEmotionTheme } from "@emotion/react";
import { useTheme } from "../../hooks";

const DARK_MODE_ARIA_LABEL = "Switch to light mode";
const LIGHT_MODE_ARIA_LABEL = "Switch to dark mode";

function ThemeTransitionSwitch() {
  const [currentTheme, setCurrentTheme] = useTheme();
  const { colorsHex } = useEmotionTheme();
  const inputRef = createRef<HTMLInputElement>();
  const isDarkMode = currentTheme === DARK_THEME;

  const handleThemeSwitchClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    inputRef.current?.focus();
    setCurrentTheme();
  };

  const currentAriaLabel = isDarkMode ? DARK_MODE_ARIA_LABEL : LIGHT_MODE_ARIA_LABEL;

  return (
    <RootStyles $isDarkMode={isDarkMode}>
      {currentTheme !== null ? (
        <>
          <input
            aria-label={currentAriaLabel}
            type="checkbox"
            defaultChecked={isDarkMode}
            onChange={handleThemeSwitchClick}
            ref={inputRef}
            tabIndex={0}
          />
          {/* eslint-disable-next-line */}
          <div onClick={handleThemeSwitchClick}>
            <MoonIcon color={colorsHex.brightSun} />
            <SunIcon color={colorsHex.brightSun} />
            <div />
          </div>
        </>
      ) : null}
    </RootStyles>
  );
}

interface StyleProps {
  $isDarkMode: boolean;
}

const RootStyles = styled.div<StyleProps>`
  height: 24px;
  width: 50px;
  margin-bottom: 3px;

  > input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

    &:active + div > div,
    &:focus + div > div {
      box-shadow: 0 0 3px 3px var(--color-royal-blue);
    }
  }

  > div {
    background-color: var(--color-black);
    border: var(--space-nano) solid var(--text-secondary);
    border-radius: var(--border-radius-infinity);
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 26px;
    justify-content: space-between;
    padding: 1px 5px 0;
    position: relative;
    touch-action: pan-x;
    width: 50px;

    > svg {
      height: 15px;
      width: 15px;
    }

    > div {
      background-color: var(--color-white);
      border-radius: var(--border-radius-infinity);
      height: 18px;
      position: absolute;
      left: 2px;
      top: 2px;
      transform: translateX(${({ $isDarkMode }) => ($isDarkMode ? "24px" : 0)});
      transition: transform var(--transition-short) cubic-bezier(0.23, 1, 0.32, 1);
      width: 18px;

      &:focus-within {
        box-shadow: 0 0 3px 3px var(--color-royal-blue);
      }
    }
  }
`;

export default ThemeTransitionSwitch;
