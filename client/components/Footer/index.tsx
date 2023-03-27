import * as React from "react";

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
                href="https://open.spotify.com/user/nathanwthomas"
                aria-label="Link to Nathan's Spotify"
                rel="noopener noreferrer"
                target="_blank"
              >
                Spotify
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
    </RootStyles>
  );
}

const RootStyles = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  footer {
    max-width: var(--app-max-width);
    width: 100%;

    > nav {
      display: flex;
      width: 100%;

      > ul {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: calc(var(--space-medium) - var(--space-small));
        width: 100%;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          padding-bottom: calc(var(--space-xxlarge) - var(--space-medium));
        }

        > li {
          display: flex;
          margin-bottom: var(--space-small);
          margin-right: var(--space-small);

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.mini}) {
            margin-right: var(--space-medium);
          }

          @media only screen and (min-width: ${({ theme }) =>
              theme.breakpoints.tablet}) {
            margin-bottom: var(--space-medium);
            margin-right: var(--space-large);
          }
        }
      }
    }
  }
`;

export default Footer;
