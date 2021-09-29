import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { CopiiTable } from "../components/CopiiTable";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface CopiiProps {}

const Copii: React.FC<CopiiProps> = ({}) => {
  return (
    <Layout>
      <Flex alignItems="center">
        <Heading>Copii</Heading>
        <NextLink href="/create-copil">
          <Button colorScheme="orange" as={Link} ml="auto">
            Adauga copil
          </Button>
        </NextLink>
      </Flex>
      <Box mt={10}>
        <CopiiTable />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Copii);
