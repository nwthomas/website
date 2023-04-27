export const ORIGIN = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const EMAIL_ROUTE = `${ORIGIN}/api/send-email`;
export const OPEN_AI_QUERY_ROUTE = `${ORIGIN}/api/open-ai`;

export const BLOG_PAGE = "/blog";
export const BLOG_ARTICLE_PAGE = "/blog/[blogId]";
export const CONTACT_PAGE = "/contact";
export const HOME_PAGE = "/";
export const PLAYGROUND_PAGE = "/playground";

export const CONTENTS_ID = "contents";
