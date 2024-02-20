import { DARK_THEME, ThemeEnum } from "../../store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLockBodyScroll, useTheme } from "../../hooks";

import { CloseIcon } from "../Icons";
import FocusTrap from "focus-trap-react";
import Image from "next/image";
import { colors } from "../../styles/libs/theme";
import { hideImageOverlay } from "../../store/reducers/blogSlice";
import { selectOverlayImage } from "../../store/selectors/blogSelector";
import styled from "styled-components";

function ImageOverlay() {
  const [currentTheme] = useTheme();
  const image = useSelector(selectOverlayImage);
  const dispatch = useDispatch();

  useLockBodyScroll();

  if (!image) {
    return null;
  }

  const handleCloseButtonClick = () => {
    dispatch(hideImageOverlay());
  };

  return (
    <FocusTrap>
      <RootStyles currentTheme={currentTheme} onClick={handleCloseButtonClick}>
        <div>
          <button
            aria-label="Close image overlay"
            onClick={handleCloseButtonClick}
          >
            <CloseIcon color="var(--text)" />
          </button>
          <div>
            <Image
              alt={image.alt}
              blurDataURL={image.placeholderImage}
              draggable={false}
              height={image.height}
              loading="eager"
              placeholder="blur"
              priority
              quality={100}
              src={image.src}
              width={image.width}
            />
          </div>
        </div>
      </RootStyles>
    </FocusTrap>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum | null;
}

const RootStyles = styled.div<StyleProps>`
  background-color: ${({ currentTheme }) =>
    currentTheme === DARK_THEME ? colors.black : colors.white};
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;

  > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    padding: var(--space-small);
    width: 100%;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      padding: var(--space-medium);
    }

    > div {
      max-height: 100vh;
    }

    > button {
      height: var(--space-large);
      margin: 0;
      padding: 0;
      position: absolute;
      right: var(--space-small);
      top: var(--space-small);
      transition: opacity var(--transition-short) ease-in-out;
      width: var(--space-large);
      z-index: 11;

      &:hover {
        opacity: 0.8;
      }

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        top: var(--space-medium);
        right: var(--space-medium);
      }
    }
  }
`;

export default ImageOverlay;
