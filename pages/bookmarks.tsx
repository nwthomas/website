import { CONTENTS_ID } from "../constants/routes";
import { JOURNAL_PAGE_NAME } from "../constants/seo";
import Layout from "../components/Layout";
import styled from "styled-components";

type Bookmark = {
  date: string;
  url: string;
};

type Bookmarks = Array<Bookmark>;

const BOOKMARKS: Bookmarks = [
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
];

function Bookmarks({ ogImage }) {
  return (
    <Layout customSEOImageUrl={ogImage} pageName={JOURNAL_PAGE_NAME} withFooter>
      <RootStyles>
        <main id={CONTENTS_ID}>
          <section>
            <h1>Articles, research papers, and videos that I've found to be excellent</h1>
          </section>
          <section>
            {BOOKMARKS.map(({ date, url }) => {
              return (
                <div key={url}>
                  <p>
                    {date}{" "}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
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

    > section:nth-child(1) {
      display: flex;
      margin-bottom: var(--space-medium);

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: var(--space-large);
      }

      > h1 > span > a {
        background-clip: text;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        background-image: url(/images/backgrounds/noise.webp);
        background-size: 50px;
        font-family: inherit;
        font-size: inherit;
        padding: var(--space-micro) 0;
        -moz-text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        text-decoration: none;

        &:hover {
          opacity: 0.8;
        }
      }

      > h1 span {
        font-family: inherit;
        white-space: nowrap;
      }
    }

    > section:nth-child(2) {
      margin-bottom: var(--space-medium);

      @media only screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: var(--space-xxlarge);
      }

      > div {
        display: flex;
        gap: var(--space-small);
        margin-bottom: var(--space-small);

        p {
          font-size: 2rem;

          a {
            font-size: 2rem;
            border-bottom: 1px dotted var(--text);
            padding-bottom: var(--space-nano);
            word-break: break-all;
          }
        }
      }
    }
  }
`;

export default Bookmarks;
