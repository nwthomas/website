import styled from "styled-components";
import BabyYoda from "../EasterEggs/BabyYoda";

function Footer() {
  return (
    <RootStyles>
      <footer>
        <div>
          <a href="https://dev.to/nwthomas">Dev.to</a>
          <a href="https://github.com/nwthomas">Github</a>
        </div>
        <div>
          <a href="https://www.instagram.com/nwthomas/">Instagram</a>
          <a href="https://www.linkedin.com/in/nwthomas-dev/">LinkedIn</a>
        </div>
        <div>
          <a href="https://twitter.com/nwthomas_">Twitter</a>
          <a href="https://www.youtube.com/channel/UCpBBezCjzvdmSrTxEoSdIcg">
            YouTube
          </a>
        </div>
      </footer>
      <BabyYoda />
    </RootStyles>
  );
}

const RootStyles = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  height: ${({ theme }) => theme.appDimensions.footerHeight};
  justify-content: center;
  position: absolute;
  padding: 0 ${({ theme }) => theme.appDimensions.appHorizontalGutters};
  width: 100%;

  > footer {
    display: flex;
    flex-direction: column;
    flex: wrap;
    justify-content: flex-start;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      align-items: center;
      flex-direction: row;
    }

    > div {
      display: flex;
      flex-direction: column;
      margin-right: ${({ theme }) => theme.spaces.large};

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.desktop}) {
        margin-right: ${({ theme }) => `calc(${theme.spaces.jumbo} * 2)`};
      }

      > a {
        cursor: pointer;
        margin-bottom: ${({ theme }) => theme.spaces.medium};
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.tablet}) {
          font-weight: bold;
        }

        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.desktop}) {
          font-size: 3rem;
        }

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity80};
        }
      }
    }
  }
`;

export default Footer;
