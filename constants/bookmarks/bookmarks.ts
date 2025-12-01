export type Bookmark = {
  date: string;
  url: string;
};

export type Bookmarks = Array<Bookmark>;

export const BOOKMARKS: Bookmarks = [
  {
    date: "2025-12-01",
    url: "https://huggingface.co/blog/faster-transformers",
  },
  {
    date: "2025-12-01",
    url: "https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization",
  },
  {
    date: "2025-11-10",
    url: "https://berkshirehathaway.com/news/nov1025.pdf",
  },
  {
    date: "2025-10-30",
    url: "https://www.fast.ai/posts/2025-10-30-build-to-last.html",
  },
  {
    date: "2025-07-29",
    url: "https://www.wheresyoured.at/the-haters-gui",
  },
  {
    date: "2025-02-02",
    url: "https://karpathy.ai/zero-to-hero.html",
  }
];