import * as React from "react";

import {
  BlogBlockQuote,
  BlogCodeBlock,
  BlogHeading,
  BlogHorizontalRule,
  BlogImage,
  BlogList,
  BlogParagraph,
} from "./";

import ReactMarkdown from "react-markdown";
import { buildKebabCaseParam } from "../../utils/routes";
import { getBlogPostFullDate } from "../../utils/dates";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { useRouter } from "next/router";

function buildHeadingId(childrenNodes): string {
  return childrenNodes.reduce((accum: string, child) => {
    if (child.type === "text") {
      const currentStringKebabCaseConversion = buildKebabCaseParam(child.value);
      return accum.length > 0
        ? `${accum}-${currentStringKebabCaseConversion}`
        : currentStringKebabCaseConversion;
    }

    return accum;
  }, "");
}

function buildBlogArticlePath(blogId: string): string {
  return `/blog/${blogId}`;
}

interface Props {
  content: string;
  dateUpdated?: string;
  dateWritten?: string;
  heroImageUrl?: string;
}

function BlogMarkdownRenderer({
  content,
  dateUpdated,
  dateWritten,
  heroImageUrl,
}: Props) {
  const {
    query: { blogId },
  } = useRouter();

  // This ternary is to keep TypeScript happy. This will only ever be a single string.
  const { current: originalPath } = React.useRef<string>(
    buildBlogArticlePath(typeof blogId === "string" ? blogId : "")
  );

  const handleRehypeExternalLinks = React.useCallback(() => {
    return rehypeExternalLinks({
      rel: ["noopener", "noreferrer"],
      target: "_blank",
    });
  }, []);

  const dateUpdatedLabel = getBlogPostFullDate(dateUpdated || "");
  const dateWrittenLabel = getBlogPostFullDate(dateWritten || "");

  console.log(dateUpdatedLabel, dateWrittenLabel);

  return (
    <ReactMarkdown
      children={content}
      components={{
        h1({ children, node }) {
          const headingId = buildHeadingId(node.children);
          const headingLinkPath = `${originalPath}#${headingId}`;

          return (
            <>
              <BlogHeading
                dateUpdated={dateUpdatedLabel}
                dateWritten={dateWrittenLabel}
                contents={children}
                level={1}
                linkPath={headingLinkPath}
                routeId={headingId}
              />
            </>
          );
        },
        h2({ children, node }) {
          const headingId = buildHeadingId(node.children);
          const headingLinkPath = `${originalPath}#${headingId}`;

          return (
            <BlogHeading
              contents={children}
              level={2}
              linkPath={headingLinkPath}
              routeId={headingId}
            />
          );
        },
        h3({ children, node }) {
          const headingId = buildHeadingId(node.children);
          const headingLinkPath = `${originalPath}#${headingId}`;

          return (
            <BlogHeading
              contents={children}
              level={3}
              linkPath={headingLinkPath}
              routeId={headingId}
            />
          );
        },
        h4({ children, node }) {
          const headingId = buildHeadingId(node.children);
          const headingLinkPath = `${originalPath}#${headingId}`;

          return (
            <BlogHeading
              contents={children}
              level={4}
              linkPath={headingLinkPath}
              routeId={headingId}
            />
          );
        },
        h5({ children, node }) {
          const headingId = buildHeadingId(node.children);
          const headingLinkPath = `${originalPath}#${headingId}`;

          return (
            <BlogHeading
              contents={children}
              level={5}
              linkPath={headingLinkPath}
              routeId={headingId}
            />
          );
        },
        p({ children }) {
          return <BlogParagraph contents={children} />;
        },
        blockquote({ children }) {
          return <BlogBlockQuote children={children} />;
        },
        hr() {
          return <BlogHorizontalRule />;
        },
        img({ alt, height, src = "", title, width }) {
          const isHeroImage = heroImageUrl === src;

          return (
            <BlogImage
              alt={alt}
              height={height}
              isHeroImage={isHeroImage}
              src={src}
              title={title}
              width={width}
            />
          );
        },
        ol({ children }) {
          return <BlogList isOrderedList contents={children} />;
        },
        ul({ children }) {
          return <BlogList isOrderedList={false} contents={children} />;
        },
        code({ className, inline, children }) {
          const language =
            typeof className === "string" && className.length > 0
              ? className.substring(9)
              : undefined;

          const content = children[0] as string;

          return (
            <BlogCodeBlock
              contents={content}
              isInline={inline}
              language={language}
            />
          );
        },
      }}
      rehypePlugins={[
        rehypeAccessibleEmojis,
        handleRehypeExternalLinks,
        rehypeRaw,
      ]}
      remarkPlugins={[remarkGfm, remarkUnwrapImages]}
    />
  );
}

export default BlogMarkdownRenderer;
