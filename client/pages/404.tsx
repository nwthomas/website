import Error from "../components/Error";
import Layout from "../components/Layout";

const PAGE_NAME = "Nathan Thomas | 404";

function FourOhFour() {
  return (
    <Layout pageName={PAGE_NAME}>
      <Error errorCode="404" />
    </Layout>
  );
}

export default FourOhFour;
