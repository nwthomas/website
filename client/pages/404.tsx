import Error from "../components/Error";
import { FOUR_OH_FOUR_PAGE_NAME } from "../constants/seo";
import Layout from "../components/Layout";

function FourOhFour() {
  return (
    <Layout pageName={FOUR_OH_FOUR_PAGE_NAME} withFooter>
      <Error errorCode="404" />
    </Layout>
  );
}

export default FourOhFour;
