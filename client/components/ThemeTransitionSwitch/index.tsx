import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import type { ThemeEnum } from "../../styles/libs/theme";
import { MoonIcon as Moon, SunIcon as Sun } from "../icons";

interface Props {
  currentTheme: ThemeEnum;
  onClick: () => void;
}

export default function ThemeTransitionButton({
  onClick,
  currentTheme,
}: Props) {
  const theme = React.useContext(ThemeContext);
  const MoonIcon = (
    <Moon title="Dark mode icon" color={theme.colorsHex.cornFlowerBlue} />
  );
  const SunIcon = (
    <Sun title="Light mode icon" color={theme.colorsHex.fireBush} />
  );
  const currentIcon = currentTheme === "dark" ? MoonIcon : SunIcon;

  return (
    <RootStyles>
      <button onClick={onClick} role="button" tabIndex={0}>
        {currentTheme ? currentIcon : null}
      </button>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.transparent};
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.appDimensions.navbarMobileHeight};
  justify-content: flex-end;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitions.medium} ease-in-out,
    transform ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.appDimensions.navbarDesktopHeight};
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity90};
  }

  > button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    height: 40px;
    padding: 0;
    width: 30px;
  }
`;
