import * as React from "react";

import { DARK_THEME, ThemeEnum } from "../../hooks/useGetPreferredTheme";

import styled from "styled-components";

interface Props {
  currentTheme: ThemeEnum | null;
  onClick: () => void;
}

export default function ThemeTransitionButton({
  onClick,
  currentTheme,
}: Props) {
  const inputRef = React.createRef<HTMLInputElement>();
  const isDarkMode = currentTheme === DARK_THEME;

  const handleThemeSwitchClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    inputRef.current?.focus();
    onClick();
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
            <p>🌙</p>
            <p>🌞</p>
            <div />
          </div>
        </>
      ) : null}
    </RootStyles>
  );
}

type StyleProps = {
  isDarkMode: boolean;
};

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
      box-shadow: 0 0 3px 3px ${({ theme }) => theme.colorsHex.pictonBlue};
    }
  }

  > div {
    background-color: ${({ theme }) => theme.colorsHex.black};
    border: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentTwo}`};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 26px;
    justify-content: space-between;
    padding: 5px 5px 0;
    position: relative;
    touch-action: pan-x;
    width: 52px;

    p {
      font-size: 1.2rem;
      text-align: center;
      user-select: none;
      vertical-align: middle;
    }

    > p:nth-child(2) {
      font-size: 1.4rem;
    }

    > div {
      background-color: ${({ theme }) => theme.colorsHex.white};
      border-radius: ${({ theme }) => theme.borderRadii.infinity};
      height: 20px;
      position: absolute;
      left: 2px;
      top: 1px;
      transform: translateX(${({ isDarkMode }) => (isDarkMode ? "24px" : 0)});
      transition: transform ${({ theme }) => theme.transitions.short}
        cubic-bezier(0.23, 1, 0.32, 1);
      width: 20px;

      &:focus-within {
        box-shadow: 0 0 3px 3px ${({ theme }) => theme.colorsHex.pictonBlue};
      }
    }
  }
`;
