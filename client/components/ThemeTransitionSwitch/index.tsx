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
  const isDarkMode = currentTheme === DARK_THEME;

  return (
    <RootStyles isDarkMode={isDarkMode}>
      {currentTheme !== null ? (
        <>
          <input
            aria-label="Switch between light and dark mode"
            type="checkbox"
            checked={isDarkMode}
            onChange={onClick}
            tabIndex={0}
          />
          <div onClick={onClick}>
            <p>🌙</p>
            <p>☀️</p>
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
  margin-bottom: 4px;

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
      box-shadow: 0 0 2px 3px ${({ theme }) => theme.colorsHex.pictonBlue};
    }
  }

  > div {
    background-color: ${({ theme }) => theme.colorsHex.black};
    border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 24px;
    justify-content: space-between;
    padding: 4px 3px 0;
    position: relative;
    width: 50px;

    p {
      font-size: 1.6rem;
      text-align: center;
      user-select: none;
      vertical-align: middle;
    }

    > p:nth-child(2) {
      font-size: 1.9rem;
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

      &:active,
      &:focus {
        box-shadow: 0 0 2px 3px ${({ theme }) => theme.colorsHex.pictonBlue};
      }
    }
  }
`;
