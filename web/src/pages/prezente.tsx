import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { CopiiTable } from "../components/CopiiTable";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { PrezenteTable } from "../components/PrezenteTable";

interface PrezenteProps {}

const Prezente: React.FC<PrezenteProps> = ({}) => {
  return (
    <Layout>
      <Flex alignItems="center">
        <Heading>Prezente</Heading>
        <NextLink href="/create-copil">
          <Button as={Link} ml="auto">
            create prezenta
          </Button>
        </NextLink>
      </Flex>
      <Box mt={10}>
        <PrezenteTable />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Prezente);
