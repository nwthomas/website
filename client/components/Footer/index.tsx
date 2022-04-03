import { BabyYoda } from "../EasterEggs";
import styled from "styled-components";

function Footer() {
  return (
    <RootStyles>
      <ul>
        <div>
          <li>
            <a
              href="https://dev.to/nwthomas"
              aria-label="Link to Dev.to"
              rel="noopener noreferrer"
              target="_target"
            >
              Dev.to
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nwthomas"
              aria-label="Link to GitHub"
              rel="noopener noreferrer"
              target="_target"
            >
              Github
            </a>
          </li>
        </div>
        <div>
          <li>
            <a
              href="https://www.instagram.com/nwthomas/"
              aria-label="Link to Instagram"
              rel="noopener noreferrer"
              target="_target"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/nwthomas-dev/"
              aria-label="Link to LinkedIn"
              rel="noopener noreferrer"
              target="_target"
            >
              LinkedIn
            </a>
          </li>
        </div>
        <div>
          <li>
            <a
              href="https://www.polywork.com/nwthomas"
              aria-label="Link to Polywork"
              rel="noopener noreferrer"
              target="_target"
            >
              Polywork
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/nwthomas_"
              aria-label="Link to Twitter"
              rel="noopener noreferrer"
              target="_target"
            >
              Twitter
            </a>
          </li>
        </div>
      </ul>
      <BabyYoda />
    </RootStyles>
  );
}

const RootStyles = styled.footer`
  bottom: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  > ul {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    flex: wrap;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    margin-bottom: ${({ theme }) => theme.spaces.large};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      flex-direction: row;
      margin-bottom: ${({ theme }) => theme.spaces.xxLarge};
    }

    > div {
      display: flex;
      flex-direction: column;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-right: ${({ theme }) => theme.spaces.jumbo};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-right: ${({ theme }) => `calc(${theme.spaces.xxLarge} * 3)`};
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.ultraWide}) {
        margin-right: ${({ theme }) => `calc(${theme.spaces.jumbo} * 3)`};
      }

      > li {
        margin-bottom: ${({ theme }) => theme.spaces.medium};
        list-style-type: none;

        > a {
          cursor: pointer;
          transition: opacity ${({ theme }) => theme.transitions.medium}
            ease-in-out;

          &:hover {
            opacity: ${({ theme }) => theme.opacity.opacity70};
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-bottom: ${({ theme }) => theme.spaces.large};
          }
        }

        > a:nth-child(1) {
          margin-bottom: ${({ theme }) => theme.spaces.medium};
        }
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        > li {
          margin-bottom: none;
        }

        > li:last-child {
          margin-bottom: 0;
        }
      }
    }

    > div:last-child > li:last-child {
      margin-bottom: 0;
    }
  }
`;

export default Footer;
