import styled from "styled-components";

interface Props {
  // finish
}

function Navbar(props: Props) {
  return (
    <RootStyles>
      <header>
        <div>
          <p>Nathan Thomas</p>
        </div>
        <nav>
          <div>
            <p>Work</p>
          </div>
          <div>
            <p>About</p>
          </div>
          <div>
            <p>Contact</p>
          </div>
        </nav>
      </header>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  height: ${({ theme }) => theme.appDimensions.navbarHeight};
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > header {
    align-items: center;
    display: flex;
    height: ${({ theme }) => theme.appDimensions.navbarHeight};
    justify-content: space-between;

    > div,
    nav {
      align-items: center;
      display: flex;
      height: ${({ theme }) => theme.appDimensions.navbarHeight};
    }

    > nav > div {
      align-items: center;
      display: flex;
      margin-left: ${({ theme }) => theme.spaces.medium};
      justify-content: center;
    }
  }
`;

export default Navbar;
