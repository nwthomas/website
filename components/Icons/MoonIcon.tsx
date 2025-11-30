import styled from "@emotion/styled";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  title?: string;
}

function MoonIcon({ color, isAriaHidden, title }: Props) {
  return (
    <RootStyles aria-hidden={isAriaHidden} color={color} viewBox="0 0 512 512">
      <title>{title || "Moon icon"}</title>
      <path
        d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
        fill={color}
        strokeLinecap="round"
        strokeLinejoin="round"
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

export default MoonIcon;
