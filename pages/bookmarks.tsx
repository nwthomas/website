import { BOOKMARKS } from "../constants/bookmarks";
import { BOOKMARKS_PAGE_NAME } from "../constants/seo";
import { CONTENTS_ID } from "../constants/routes";
import Layout from "../components/Layout";
import { createOgImage } from "../utils/ogImage";
import styled from "@emotion/styled";

export async function getStaticProps() {
  // Dynamic og image creation at build time
  const ogImageBuildUrl = `/og-image?title=${BOOKMARKS_PAGE_NAME}`;
  const ogImage = await createOgImage(ogImageBuildUrl);

  return {
    props: {
      ogImage,
    },
  };
}

function Bookmarks({ ogImage }) {
  return (
    <Layout customSEOImageUrl={ogImage} pageName={BOOKMARKS_PAGE_NAME} withFooter>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            {BOOKMARKS.map(({ date, title, url }) => {
              return (
                <div key={url}>
                  <p>
                    {date}{" "}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {title}
                    </a>
                  </p>
                </div>
              );
            })}
          </section>
        </main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 var(--app-horizontal-gutters);
  width: 100%;

  > main {
    max-width: var(--app-max-width);
    width: 100%;

    > section {
      margin-bottom: var(--space-medium);

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: var(--space-xxlarge);
      }

      > div {
        display: flex;
        gap: var(--space-small);
        margin-bottom: var(--space-medium);

        @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
          margin-bottom: var(--space-small);
        }

        p {
          font-family:
            "Fira Mono",
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            Liberation Mono,
            Courier New,
            monospace;
          font-size: 2rem;

          a {
            font-family: inherit;
            font-size: 2rem;
            border-bottom: 1px dotted var(--text);
            padding-bottom: var(--space-nano);
            word-break: break-word;
          }
        }
      }
    }
  }
`;

export default Bookmarks;
