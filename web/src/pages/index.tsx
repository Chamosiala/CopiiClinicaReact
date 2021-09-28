import { Heading } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <Layout>
      <Heading>hello</Heading>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(index);
