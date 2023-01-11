import * as React from "react";

import { DARK_THEME } from "../../store/themeSlice";
import { useGetPreferredTheme } from "../../hooks";
import { MoonIcon, SunIcon } from "../Icons";
import styled, { ThemeContext } from "styled-components";

function ThemeTransitionSwitch() {
  const [currentTheme, setCurrentTheme] = useGetPreferredTheme();
  const { colorsHex } = React.useContext(ThemeContext);
  const inputRef = React.createRef<HTMLInputElement>();
  const isDarkMode = currentTheme === DARK_THEME;

  const handleThemeSwitchClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    inputRef.current?.focus();
    setCurrentTheme();
  };

  return (
    <RootStyles isDarkMode={isDarkMode}>
      {currentTheme !== null ? (
        <>
          <input
            aria-label="Switch between light and dark mode"
            type="checkbox"
            defaultChecked={isDarkMode}
            onChange={handleThemeSwitchClick}
            ref={inputRef}
            tabIndex={0}
          />
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
  isDarkMode: boolean;
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
      box-shadow: 0 0 3px 3px ${({ theme }) => theme.colorsHex.cornflowerBlue};
    }
  }

  > div {
    background-color: ${({ isDarkMode, theme }) =>
      isDarkMode ? theme.colorsHex.black : theme.colorsHex.mineShaft};
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.textSecondary}`};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
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
      background-color: ${({ theme }) => theme.colorsHex.white};
      border-radius: ${({ theme }) => theme.borderRadii.infinity};
      height: 18px;
      position: absolute;
      left: 2px;
      top: 2px;
      transform: translateX(${({ isDarkMode }) => (isDarkMode ? "24px" : 0)});
      transition: transform ${({ theme }) => theme.transitions.short}
        cubic-bezier(0.23, 1, 0.32, 1);
      width: 18px;

      &:focus-within {
        box-shadow: 0 0 3px 3px ${({ theme }) => theme.colorsHex.pictonBlue};
      }
    }
  }
`;

export default ThemeTransitionSwitch;
