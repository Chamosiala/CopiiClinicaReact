import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { Table, Th, Thead, Tr } from "@chakra-ui/table";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { ToatePrezentele } from "../components/ToatePrezentele";
import { createUrqlClient } from "../utils/createUrqlClient";

interface PrezenteProps {}

const Prezente: React.FC<PrezenteProps> = ({}) => {
  return (
    <Layout>
      <Flex alignItems="center">
        <Heading>Prezente</Heading>
        <NextLink href="/create-prezenta">
          <Link ml="auto">
            <Button zIndex={-1} colorScheme="orange" as={Link}>
              Adauga prezenta
            </Button>
          </Link>
        </NextLink>
      </Flex>
      <Box mt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Copil</Th>
              <Th>Data</Th>
              <Th isNumeric={true}>Prezent</Th>
            </Tr>
          </Thead>
          <ToatePrezentele />
        </Table>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Prezente);
