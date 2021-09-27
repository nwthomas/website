import { useEffect, useState } from "react";

const INTERVAL_AMOUNT = 1000;
const STATIC_EMOJI_LIST = [..."🦄🌀🍪🤬🦑👻✨🌧🤯👁👄👁"];

export function useGetPageName(initialPageName: string) {
  const [rotatingEmojiList, setRotatingEmojiList] = useState(STATIC_EMOJI_LIST);
  const pageName = initialPageName + " ";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      const lastEmoji = rotatingEmojiList[0];
      setRotatingEmojiList([...rotatingEmojiList.slice(1), lastEmoji]);
    }, INTERVAL_AMOUNT);

    return () => clearInterval(interval);
  }, [rotatingEmojiList, setRotatingEmojiList]);

  return pageName.concat(rotatingEmojiList.join(""));
}
