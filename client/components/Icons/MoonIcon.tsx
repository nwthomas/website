import styled from "styled-components";

interface Props {
  color: string;
  title?: string;
}

function MoonIcon({ color, title }: Props) {
  return (
    <RootStyles
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
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