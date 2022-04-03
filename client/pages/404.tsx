import Error from "../components/Error";
import Layout from "../components/Layout";

function FourOhFour() {
  return (
    <Layout pageName="Oops">
      <Error errorCode="404" />
    </Layout>
  );
}

export default FourOhFour;
