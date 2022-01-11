import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import type { ThemeEnum } from "../../hooks/useGetPreferredTheme";
import { MoonIcon as Moon, SunIcon as Sun } from "../icons";

interface Props {
  currentTheme: ThemeEnum | null;
  onClick: () => void;
}

export default function ThemeTransitionButton({
  onClick,
  currentTheme,
}: Props) {
  const theme = React.useContext(ThemeContext);
  const MoonIcon = (
    <Moon title="Dark mode icon" color={theme.colorsHex.royalBlue} />
  );
  const SunIcon = (
    <Sun title="Light mode icon" color={theme.colorsHex.fireBush} />
  );
  const currentIcon = currentTheme === "dark" ? MoonIcon : SunIcon;

  return (
    <RootStyles>
      {currentTheme !== null ? (
        <button onClick={onClick} role="button" tabIndex={0}>
          {currentTheme ? currentIcon : null}
        </button>
      ) : null}
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.transparent};
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out,
    transform ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100%;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity90};
  }

  > button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    height: 30px;
    padding: 0;
    width: 30px;
  }
`;
