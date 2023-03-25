import NavbarLink from "./NavbarLink";
import ThemeTransitionSwitch from "../ThemeTransitionSwitch";
import styled from "styled-components";

interface Props {
  currentPath: string;
}

function MobileNavbar({ currentPath }: Props) {
  return (
    <RootStyles>
      <button>
        <div />
        <div />
      </button>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  > button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font: inherit;
    height: ${({ theme }) => theme.spaces.small};
    justify-content: space-between;
    margin: 0;
    outline-offset: ${({ theme }) => theme.spaces.micro};
    padding: 0;
    width: ${({ theme }) => `calc(${theme.spaces.xxSmall} * 5)`};

    > div:first-child {
      background-color: ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.borderRadii.infinity};
      height: ${({ theme }) => theme.spaces.micro};
      width: 100%;
    }

    > div:last-child {
      background-color: ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.borderRadii.infinity};
      height: ${({ theme }) => theme.spaces.micro};
      width: 100%;
    }
  }
`;

export default MobileNavbar;
