import styled from "styled-components";

interface Props {
  color: string;
  title?: string;
}

function CopyLinkIcon({ color, title }: Props) {
  return (
    <RootStyles color={color} viewBox="0 0 512 512">
      <title>{title || "Copy link"}</title>
      <path
        d="M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="36"
      />
    </RootStyles>
  );
}

interface StyleProps {
  color: string;
}

const RootStyles = styled.svg<StyleProps>`
  stroke: #fff;
`;

export default CopyLinkIcon;
