import { CONTENTS_ID } from "../constants/routes";
import Error from "../components/Error";
import { FOUR_OH_FOUR_PAGE_NAME } from "../constants/seo";
import Layout from "../components/Layout";

export async function getStaticProps() {
  return {
    props: {},
  };
}

function FourOhFour() {
  return (
    <Layout pageName={FOUR_OH_FOUR_PAGE_NAME} withFooter withPageNameEmojis>
      <main id={CONTENTS_ID}>
        <Error errorCode="404" />
      </main>
    </Layout>
  );
}

export default FourOhFour;
