import styled from "styled-components";

type Props = {
  ariaLabel: string;
  imageDimensions: {
    height: number;
    width: number;
  };
  imageAlt: string;
  imageSrc: string;
  title: string;
  url: string;
};

function WorkExample({
  ariaLabel,
  imageDimensions: { height, width },
  imageAlt,
  imageSrc,
  title,
  url,
}: Props) {
  return (
    <RootStyles>
      <a
        href={url}
        aria-label={ariaLabel}
        rel="noopener noreferrer"
        target="_target"
      >
        <img
          alt={imageAlt || "Image"}
          src={imageSrc}
          height={height}
          width={width}
        />
        <h2>{title}</h2>
      </a>
    </RootStyles>
  );
}

const RootStyles = styled.li`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.ultraWide}) {
    max-width: 700px;
  }

  > a {
    width: 100%;

    > h2 {
      margin-top: ${({ theme }) => theme.spaces.medium};
      text-align: center;
    }
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity70};
    transform: translateY(-3px);
  }
`;

export default WorkExample;
