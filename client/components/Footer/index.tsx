import * as React from "react";

import { BabyYoda } from "../EasterEggs";
import styled from "styled-components";
import { useIsArticlePage } from "../../hooks";

function Footer() {
  const currentYear = new Date().getFullYear();
  const isArticlePage = useIsArticlePage();

  const copyrightLabel = React.useMemo(() => {
    return `© ${currentYear} Nathan Thomas`;
  }, [currentYear]);

  return (
    <RootStyles isArticlePage={isArticlePage}>
      <footer>
        <p>{copyrightLabel}</p>
        <nav>
          <ul>
            <li>
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nwthomas/"
                aria-label="Link to Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/nwthomas-dev/"
                aria-label="Link to LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@nwthomas"
                aria-label="Link to Medium"
                rel="noopener noreferrer"
                target="_blank"
              >
                Medium
              </a>
            </li>
            <li>
              <a
                href="https://www.polywork.com/nwthomas"
                aria-label="Link to Polywork"
                rel="noopener noreferrer"
                target="_blank"
              >
                Polywork
              </a>
            </li>
            <li>
              <a
                href="https://substack.com/profile/11012426-nathan-thomas"
                aria-label="Link to Substack"
                rel="noopener noreferrer"
                target="_blank"
              >
                Substack
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/nwthomas_"
                aria-label="Link to Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                Twitter
              </a>
            </li>
          </ul>
        </nav>
      </footer>
      <BabyYoda />
    </RootStyles>
  );
}

interface StyleProps {
  isArticlePage: boolean;
}

const RootStyles = styled.div<StyleProps>`
  bottom: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  footer {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: ${({ isArticlePage, theme }) =>
      isArticlePage ? theme.appDimensions.articleMaxWidth : "100%"};

    > p {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: 1.6rem;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-top: ${({ theme }) => theme.spaces.micro};
        font-size: 2rem;
      }
    }

    > nav {
      display: flex;
      width: 100%;

      > ul {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: ${({ theme }) => theme.spaces.medium};
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          padding-bottom: ${({ theme }) => theme.spaces.xxLarge};
        }

        > li {
          display: flex;
          margin-top: ${({ theme }) => theme.spaces.small};
          margin-right: ${({ theme }) => theme.spaces.small};

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.mini}) {
            margin-right: ${({ theme }) => theme.spaces.medium};
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-top: ${({ theme }) => theme.spaces.medium};
            margin-right: ${({ theme }) => theme.spaces.large};
          }

          > a:focus {
            outline: none;
            text-decoration-color: ${({ theme }) => theme.colors.textSecondary};
          }
        }

        > li:last-child > div:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default Footer;
