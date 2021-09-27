import styled from "styled-components";
import Link from "next/link";

interface Props {
  // finish
}

function Navbar(props: Props) {
  return (
    <RootStyles>
      <header>
        <div>
          <Link href="/">Nathan Thomas</Link>
        </div>
        <nav>
          <div>
            <Link href="/writing">Writing</Link>
          </div>
          <div>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
      </header>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.bodyBackground};
  height: ${({ theme }) => theme.appDimensions.navbarHeight};
  left: 0;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  position: absolute;
  justify-content: center;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;

  > header {
    align-items: center;
    display: flex;
    height: ${({ theme }) => theme.appDimensions.navbarHeight};
    justify-content: space-between;
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    width: 100%;

    > div,
    nav {
      align-items: center;
      display: flex;
      height: ${({ theme }) => theme.appDimensions.navbarHeight};
      justify-content: center;

      a {
        transition: opacity ${({ theme }) => theme.transitions.medium}
          ease-in-out;

        &:hover {
          opacity: ${({ theme }) => theme.opacity.opacity80};
        }
      }
    }

    > nav > div {
      align-items: center;
      display: flex;
      margin-left: ${({ theme }) => theme.spaces.small};
      justify-content: center;
    }
  }
`;

export default Navbar;
