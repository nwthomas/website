import styled from "styled-components";
import { SettingsIcon } from "../icons";

interface Props {
  // finish
}

function ContactForm(props: Props) {
  return (
    <RootStyles>
      <div>
        <h2>Message</h2>
        <div>
          <SettingsIcon color="white" />
        </div>
      </div>
      <form>
        <input placeholder="What's your name?"></input>
        <input placeholder="How can I get back to you?"></input>
        <textarea placeholder="What's happening?"></textarea>
        <button type="submit">Submit</button>
      </form>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  border-radius: ${({ theme }) => theme.borderRadii.xxLarge};
  background: ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
  max-width: 500px;
  padding: ${({ theme }) => theme.spaces.small};
  width: 100%;
  -webkit-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);

  > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spaces.small};
    margin-top: ${({ theme }) => theme.spaces.micro};
    padding: 0 ${({ theme }) => theme.spaces.small};

    > h2 {
      font-size: 1.6rem;
    }

    > div {
      cursor: pointer;
      width: 20px;
    }
  }

  > form {
    display: flex;
    flex-direction: column;

    > textarea {
      background: ${({ theme }) => theme.colors.bodyBackground};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
      border-top-left-radius: ${({ theme }) => theme.borderRadii.large};
      border-bottom-left-radius: ${({ theme }) => theme.borderRadii.large};
      border-top-right-radius: ${({ theme }) => theme.borderRadii.large};
      height: ${({ theme }) => theme.spaces.xxLarge};
      height: ${({ theme }) => theme.spaces.xxLarge};
      margin-bottom: ${({ theme }) => theme.spaces.micro};
      padding: ${({ theme }) => theme.spaces.medium};
      resize: vertical;
    }

    > input {
      background: ${({ theme }) => theme.colors.bodyBackground};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      min-height: ${({ theme }) => theme.spaces.xxLarge};
      margin-bottom: ${({ theme }) => theme.spaces.micro};
      padding: ${({ theme }) => theme.spaces.medium};
    }

    > button {
      background: ${({ theme }) => theme.colorsHex.royalBlue};
      border-radius: ${({ theme }) => theme.borderRadii.large};
      border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundAccentOne};
      cursor: pointer;
      font-weight: bold;
      margin-top: ${({ theme }) => theme.spaces.nano};
      height: ${({ theme }) => theme.spaces.xLarge};
    }
  }
`;

export default ContactForm;
