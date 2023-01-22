import * as React from "react";

import { BabyYoda } from "../EasterEggs";
import styled from "styled-components";

function Footer() {
  return (
    <RootStyles>
      <footer>
        <nav>
          <ul>
            <li>
              <a
                href="https://dev.to/nwthomas"
                aria-label="Link to Nathan's Dev.to"
                rel="noopener noreferrer"
                target="_blank"
              >
                Dev.to
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to Nathan's GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nwthomas/"
                aria-label="Link to Nathan's Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/nwthomas-dev/"
                aria-label="Link to Nathan's LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@nwthomas"
                aria-label="Link to Nathan's Medium"
                rel="noopener noreferrer"
                target="_blank"
              >
                Medium
              </a>
            </li>
            <li>
              <a
                href="https://www.polywork.com/nwthomas"
                aria-label="Link to Nathan's Polywork"
                rel="noopener noreferrer"
                target="_blank"
              >
                Polywork
              </a>
            </li>
            <li>
              <a
                href="https://nathanthomas.substack.com/"
                aria-label="Link to Nathan's Substack"
                rel="noopener noreferrer"
                target="_blank"
              >
                Substack
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/nwthomas_"
                aria-label="Link to Nathan's Twitter"
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

const RootStyles = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  footer {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > nav {
      display: flex;
      width: 100%;

      > ul {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: ${({ theme }) =>
          `calc(${theme.spaces.medium} - ${theme.spaces.small})`};
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          padding-bottom: ${({ theme }) =>
            `calc(${theme.spaces.xxLarge} - ${theme.spaces.medium})`};
        }

        > li {
          display: flex;
          margin-bottom: ${({ theme }) => theme.spaces.small};
          margin-right: ${({ theme }) => theme.spaces.small};

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.mini}) {
            margin-right: ${({ theme }) => theme.spaces.medium};
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-bottom: ${({ theme }) => theme.spaces.medium};
            margin-right: ${({ theme }) => theme.spaces.large};
          }

          > a:focus {
            outline: none;
            text-decoration-color: ${({ theme }) => theme.colors.textSecondary};
          }
        }
      }
    }
  }
`;

export default Footer;
