import styled from "styled-components";
import {
  DARK_THEME,
  LIGHT_THEME,
  useGetPreferredTheme,
} from "../../hooks/useGetPreferredTheme";

function ThemeTransitionSwitch() {
  const [currentTheme, setCurrentTheme] = useGetPreferredTheme();

  const handleChangeTheme = () => {
    setCurrentTheme();
  };

  return (
    <RootStyles onClick={handleChangeTheme}>
      <div />
    </RootStyles>
  );
}

const RootStyles = styled.button`
  background: black;
  border: 1px solid ${({ theme }) => theme.colorsHex.alabaster};
  border-radius: ${({ theme }) => theme.borderRadii.infinity};
  cursor: pointer;
  height: 25px;
  position: relative;
  width: 50px;

  > div {
    background: white;
    border: 1px solid ${({ theme }) => theme.colorsHex.alabaster};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
    height: 24px;
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
  }
`;

export default ThemeTransitionSwitch;
