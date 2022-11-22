import * as React from "react";

import { BabyYoda } from "../EasterEggs";
import styled from "styled-components";

function Footer() {
  const currentYear = new Date().getFullYear();

  const copyrightLabel = React.useMemo(() => {
    return `Copyright © ${currentYear} Nathan Thomas`;
  }, [currentYear]);

  return (
    <RootStyles>
      <footer>
        <p>{copyrightLabel}</p>
        <nav>
          <ul>
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
            <li>
              <a
                href="https://medium.com/@nwthomas"
                aria-label="Link to Medium"
                rel="noopener noreferrer"
                target="_target"
              >
                Medium
              </a>
            </li>
            <li>
              <a
                href="https://nathanthomas.substack.com/"
                aria-label="Link to Substack newsletter"
                rel="noopener noreferrer"
                target="_target"
              >
                Substack
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

    > p {
      color: ${({ theme }) => theme.colors.textSecondary};
      margin-bottom: ${({ theme }) => theme.spaces.small};
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
        padding-bottom: ${({ theme }) => theme.spaces.large};
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          padding-bottom: ${({ theme }) => theme.spaces.xxLarge};
        }

        > li {
          display: flex;
          margin-top: ${({ theme }) => theme.spaces.small};
          margin-right: ${({ theme }) => theme.spaces.medium};

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-top: ${({ theme }) => theme.spaces.medium};
            margin-right: ${({ theme }) => theme.spaces.large};
          }

          > a {
            transition: opacity ${({ theme }) => theme.transitions.medium}
              ease-in-out;
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
