import styled from "@emotion/styled";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  title?: string;
}

function CopyLinkIcon({ color, isAriaHidden, title }: Props) {
  return (
    <RootStyles aria-hidden={isAriaHidden} color={color} viewBox="0 0 512 512">
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
  stroke: ${({ color }) => color};
`;

export default CopyLinkIcon;
