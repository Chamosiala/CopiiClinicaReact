import { Box, Heading } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useGetCopilFromUrl } from "../../utils/useGetCopilFromUrl";
import { PrezenteTable } from "../../components/PrezenteTable";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";

export const Copil = ({}) => {
  const [{ data, error, fetching }] = useGetCopilFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.copil) {
    return (
      <Layout>
        <Box>Copilul nu exista</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>
        #{data.copil.id} {data.copil.nume} {data.copil.prenume}
      </Heading>
      <PrezenteTable copil={data.copil as any} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Copil);
