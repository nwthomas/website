import Layout from "../components/Layout";
import Error from "../components/Error";

function FourOhFour() {
  return (
    <Layout pageName="Oops">
      <Error errorCode="404" />
    </Layout>
  );
}

export default FourOhFour;
