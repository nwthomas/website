import * as React from "react";

const INTERVAL_AMOUNT = 1000;
const STATIC_EMOJI_LIST = [..."🌝🌖🌗🌘🌚🌒🌓🌔"];

export function useGetPageName(
  initialPageName: string,
  withPageNameEmojis?: boolean
) {
  const [rotatingEmojiList, setRotatingEmojiList] =
    React.useState(STATIC_EMOJI_LIST);
  const pageName = initialPageName + " ";

  React.useEffect(() => {
    if (!withPageNameEmojis) {
      return;
    }

    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      const lastEmoji = rotatingEmojiList[0];
      setRotatingEmojiList([...rotatingEmojiList.slice(1), lastEmoji]);
    }, INTERVAL_AMOUNT);

    return () => clearInterval(interval);
  }, [rotatingEmojiList, setRotatingEmojiList]);

  if (!withPageNameEmojis) {
    return initialPageName;
  }

  return pageName.concat(rotatingEmojiList.join(""));
}
