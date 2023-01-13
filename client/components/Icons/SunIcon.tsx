import styled from "styled-components";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  title?: string;
}

function SunIcon({ color, isAriaHidden, title }: Props) {
  return (
    <RootStyles aria-hidden={isAriaHidden} color={color} viewBox="0 0 512 512">
      <title>{title || "Sun icon"}</title>
      <path
        fill={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="40"
        d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
      />
      <circle
        cx="256"
        cy="256"
        r="80"
        fill={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
    </RootStyles>
  );
}

interface StyleProps {
  color: string;
}

const RootStyles = styled.svg<StyleProps>`
  stroke: ${({ color }) => color};
`;

export default SunIcon;
