import {
  BlogBlockQuote,
  BlogHeading,
  BlogHorizontalRule,
  BlogImage,
  BlogParagraph,
} from "./";

import ReactMarkdown from "react-markdown";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { useCallback } from "react";

interface Props {
  content: string;
  heroImageUrl?: string;
}

function BlogMarkdownRenderer({ content, heroImageUrl }: Props) {
  const handleRehypeExternalLinks = useCallback(() => {
    return rehypeExternalLinks({
      rel: ["noopener", "noreferrer"],
      target: "_blank",
    });
  }, []);

  return (
    <ReactMarkdown
      children={content}
      components={{
        blockquote({ children }) {
          return <BlogBlockQuote children={children} />;
        },
        h1({ children }) {
          return <BlogHeading contents={children} level={1} />;
        },
        h2({ children }) {
          return <BlogHeading contents={children} level={2} />;
        },
        h3({ children }) {
          return <BlogHeading contents={children} level={3} />;
        },
        h4({ children }) {
          return <BlogHeading contents={children} level={4} />;
        },
        h5({ children }) {
          return <BlogHeading contents={children} level={5} />;
        },
        hr() {
          return <BlogHorizontalRule />;
        },
        p({ children }) {
          return <BlogParagraph contents={children} />;
        },
        img({ alt, src, title }) {
          const isHeroImage = heroImageUrl === src;

          return (
            <BlogImage
              alt={alt}
              isHeroImage={isHeroImage}
              src={src}
              title={title}
            />
          );
        },
      }}
      rehypePlugins={[rehypeAccessibleEmojis, handleRehypeExternalLinks]}
      remarkPlugins={[remarkGfm, remarkUnwrapImages]}
    />
  );
}

export default BlogMarkdownRenderer;
