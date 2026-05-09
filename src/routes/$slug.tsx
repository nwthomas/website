import { MDXProvider } from "@mdx-js/react";
import { createFileRoute } from "@tanstack/react-router";

import { ImageOverlayContainer } from "@/components/ImageOverlay";
import { RedisIncrement } from "@/components/RedisIncrement";
import { loadPostOrThrow } from "@/content/load-post";
import { mdxProviderComponents } from "@/mdx-components";
import { SITE_URL, pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const mod = loadPostOrThrow(params.slug);
    return { metadata: mod.metadata, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: pageMeta({
        title: `${loaderData.metadata.title} | Nathan Thomas`,
        description: loaderData.metadata.excerpt,
        ogTitle: loaderData.metadata.title,
        ogDescription: loaderData.metadata.excerpt,
        ogImage: `${SITE_URL}/${loaderData.slug}/opengraph-image`,
      }),
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const mod = loadPostOrThrow(slug);
  const Post = mod.default;

  return (
    <article className="w-full -mb-5 flex flex-col items-center">
      <MDXProvider components={mdxProviderComponents}>
        <Post />
      </MDXProvider>
      <ImageOverlayContainer />
      {import.meta.env.PROD ? <RedisIncrement slug={slug} /> : null}
    </article>
  );
}
