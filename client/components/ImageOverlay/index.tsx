import { DARK_THEME, ThemeEnum } from "../../store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLockBodyScroll, useTheme } from "../../hooks";

import { CloseIcon } from "../Icons";
import FocusTrap from "focus-trap-react";
import Image from "next/image";
import React from "react";
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

  const handleCloseButtonClick = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event.target instanceof HTMLImageElement === false) {
      dispatch(hideImageOverlay());
    }
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
  backdrop-filter: blur(var(--space-xxsmall));
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  /* https://graffino.com/til/CjT2jrcLHP-how-to-fix-filter-blur-performance-issue-in-safari */
  transform: translate3d(0, 0, 0);
  z-index: 10;

  &::before {
    backdrop-filter: blur(15px);
    background-color: var(--body-bg-blur);
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.95;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

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
      border: 1px solid var(--body-bg-accent-two);
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
