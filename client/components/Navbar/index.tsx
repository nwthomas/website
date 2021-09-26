import styled from "styled-components";

interface Props {
  // finish
}

function Navbar(props: Props) {
  return (
    <RootStyles>
      <div>
        <div>
          <p>Nathan Thomas</p>
        </div>
        <nav>
          <p>Link 1</p>
          <p>Link 2</p>
        </nav>
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  height: ${({ theme }) => theme.appDimensions.navbarHeight};
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > div {
    align-items: center;
    display: flex;
    height: ${({ theme }) => theme.appDimensions.navbarHeight};
    justify-content: space-between;

    > div,
    nav {
      align-items: center;
      display: flex;
      height: ${({ theme }) => theme.appDimensions.navbarHeight};

      > p {
        font-size: 2.6rem;
      }
    }
  }
`;

export default Navbar;
