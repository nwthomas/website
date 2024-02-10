export const ORIGIN = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const SEND_EMAIL = `${ORIGIN}/api/send-email`;

export const BLOG_PAGE = "/blog";
export const BLOG_ARTICLE_PAGE = "/blog/[blogId]";
export const CONTACT_PAGE = "/contact";
export const HOME_PAGE = "/";
export const PLAYGROUND_PAGE = "/playground";

export const CONTENTS_ID = "contents";

export const PLAYGROUND_PAGE_ENABLED =
  process.env.NEXT_PUBLIC_PLAYGROUND_PAGE_ENABLED;
