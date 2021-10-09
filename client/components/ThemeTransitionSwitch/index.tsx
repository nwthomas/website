import styled from "styled-components";
import type { ThemeEnum } from "../../styles/libs/theme";

interface Props {
  currentTheme: ThemeEnum;
  onClick: () => void;
}

const MoonIcon = <img alt="Sun icon" src="/moon.png" />;
const SunIcon = <img alt="Moon icon" src="/sun.png" />;

export default function ThemeTransitionButton({
  onClick,
  currentTheme,
}: Props) {
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
  height: ${({ theme }) => theme.appDimensions.navbarHeight};
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
    height: 40px;
    padding: 0;
    width: 30px;
  }
`;
