import * as React from "react";

import { CONTENTS_ID } from "../../constants/routes";
import Layout from "../../components/Layout";
import styled from "styled-components";

const PAGE_NAME = "Happiness Model";

export async function getStaticProps() {
  return {
    props: {},
  };
}

function HappinessModel() {
  return (
    <Layout pageName={PAGE_NAME} withFooter>
      <RootStyles>
        <main id={CONTENTS_ID}></main>
      </RootStyles>
    </Layout>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.appDimensions.appHorizontalGutters}`};
  width: 100%;

  > main {
    max-width: ${({ theme }) => theme.appDimensions.appMaxWidth};
    margin-bottom: ${({ theme }) => theme.spaces.medium};

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.tablet}) {
      margin-bottom: ${({ theme }) =>
        `calc(${theme.spaces.xxLarge} + ${theme.spaces.medium})`};
      margin-top: ${({ theme }) => theme.spaces.medium};
    }
  }
`;

export default HappinessModel;
