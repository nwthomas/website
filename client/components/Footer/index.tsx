import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { BabyYoda } from "../EasterEggs";
import {
  DevDotToIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  PolyworkIcon,
  TwitterIcon,
} from "../icons";

function Footer() {
  const { colors } = React.useContext(ThemeContext);
  const copyrightYear = new Date().getFullYear();
  const copyright = `© Nathan Thomas ${copyrightYear}`;

  return (
    <RootStyles>
      <footer>
        <p>{copyright}</p>
        <nav>
          <ul>
            <li>
              <a
                href="https://dev.to/nwthomas"
                aria-label="Link to Dev.to"
                rel="noopener noreferrer"
                target="_target"
              >
                <DevDotToIcon color={colors.text} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nwthomas"
                aria-label="Link to GitHub"
                rel="noopener noreferrer"
                target="_target"
              >
                <GitHubIcon color={colors.text} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nwthomas/"
                aria-label="Link to Instagram"
                rel="noopener noreferrer"
                target="_target"
              >
                <InstagramIcon color={colors.text} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/nwthomas-dev/"
                aria-label="Link to LinkedIn"
                rel="noopener noreferrer"
                target="_target"
              >
                <LinkedInIcon color={colors.text} />
              </a>
            </li>
            <li>
              <a
                href="https://www.polywork.com/nwthomas"
                aria-label="Link to Polywork"
                rel="noopener noreferrer"
                target="_target"
              >
                <PolyworkIcon color={colors.text} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/nwthomas_"
                aria-label="Link to Twitter"
                rel="noopener noreferrer"
                target="_target"
              >
                <TwitterIcon color={colors.text} />
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
  height: ${({ theme }) => theme.appDimensions.footerMobileHeight};
  justify-content: center;
  position: absolute;
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.appDimensions.footerDesktopHeight};
  }

  > footer {
    display: flex;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      flex-direction: column;
    }

    > p {
      margin-bottom: ${({ theme }) => theme.spaces.medium};
    }

    > nav {
      width: 100%;

      > ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        > li {
          list-style-type: none;
          margin-right: ${({ theme }) => theme.spaces.medium};
          max-width: 30px;
          width: 100%;

          > a {
            display: block;
            cursor: pointer;
            transition: transform ${({ theme }) => theme.transitions.medium}
                ease-in-out,
              opacity ${({ theme }) => theme.transitions.medium} ease-in-out;

            &:hover {
              opacity: ${({ theme }) => theme.opacity.opacity70};
              transform: translateY(-3px);
            }

            @media only screen and (min-width: ${({ theme }) =>
                theme.breakpoints.tablet}) {
              margin-bottom: ${({ theme }) => theme.spaces.large};
            }
          }
        }
      }
    }
  }
`;

export default Footer;
