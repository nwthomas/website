import { useEffect, useState } from "react";

import type { ThemeEnum } from "../../hooks/useGetPreferredTheme";
import styled from "styled-components";

/**
 * NOTE: For anyone else that ever reads this code, I'm *extremely* unhappy with the implementation.
 * The Twitter embeds process uses a raw JS script that I had to load in after the client
 * initialized, and I would have much preferred to do it server-side. Also, the 'twttr' widget
 * doesn't play nicely with TS or with React/NextJS, necessitating the raw DOM manipulation hacks
 * you see here. If I learn of a better process, I'll update this in the future.
 */

interface CreateTweetOptions {
  conversation: "none";
  dnt: boolean;
  lang: "en";
  theme: ThemeEnum;
}

// This extends the Window object with the methods used in this component from the Twitter Embeds
// extensions.
/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    twttr: {
      init: boolean;
      widgets: {
        createTweet: (
          tweetId: string,
          element: HTMLElement,
          options: CreateTweetOptions
        ) => void;
        load: () => void;
      };
    };
  }
}
/* eslint-enable no-unused-vars */

interface Props {
  currentTheme: ThemeEnum;
  tweetId: string;
}

function Tweet({ currentTheme, tweetId }: Props) {
  const [isLoaded, setIsLoading] = useState(false);

  // The first pass needs to use the <blockquote /> and <a /> tag by calling the script load()
  // method which scans the DOM. Subsequent "re-renders" will manually remove children (on the
  // change of the currentTheme prop) and manually create a new Tweet.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window?.twttr?.init &&
      window?.twttr?.widgets?.load
    ) {
      window.twttr.widgets.load();
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.twttr?.init &&
      window?.twttr?.widgets.load &&
      window?.twttr?.widgets?.createTweet
    ) {
      if (!isLoaded) {
        window.twttr.widgets.load();
        setIsLoading(true);
      } else {
        const tweetContainerElement = document.getElementById("container");

        if (tweetContainerElement?.firstChild) {
          while (tweetContainerElement.firstChild) {
            tweetContainerElement.removeChild(tweetContainerElement.firstChild);
          }

          const tweetRootElement = document.createElement("div");
          tweetRootElement.setAttribute("id", "tweet");

          tweetContainerElement.appendChild(tweetRootElement);
          createTweet(tweetId, tweetRootElement, {
            conversation: "none",
            dnt: true,
            lang: "en",
            theme: currentTheme,
          });
        }
      }
    }
  }, [currentTheme, isLoaded, tweetId]);

  return (
    <RootStyles>
      <h2>Latest Tweet</h2>
      <div id="container">
        <blockquote
          className="twitter-tweet"
          data-dnt
          data-theme={currentTheme}
          data-conversation="none"
          data-lang="en"
        >
          <a href={`https://twitter.com/nwthomas_/status/${tweetId}`}></a>
        </blockquote>
      </div>
    </RootStyles>
  );
}

function createTweet(
  tweetId: string,
  element: HTMLElement,
  options: CreateTweetOptions
) {
  if (typeof window !== "undefined" && window?.twttr?.widgets?.createTweet) {
    window.twttr.widgets.createTweet(tweetId, element, options);
  }
}

const RootStyles = styled.div`
  > h2 {
    padding-bottom: ${({ theme }) => theme.spaces.small};
  }
`;

export default Tweet;
