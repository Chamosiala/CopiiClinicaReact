import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useGetCopilFromUrl } from "../../utils/useGetCopilFromUrl";
import { PrezenteTable } from "../../components/PrezenteTable";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";

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
      <Flex alignItems="center" mb={8}>
        <Heading>
          #{data.copil.id} {data.copil.nume} {data.copil.prenume}
        </Heading>
        <NextLink
          href="/create-prezenta/[id]"
          as={`/create-prezenta/${data.copil.id}`}
        >
          <Link ml="auto">
            <Button mr={2} as={Link} zIndex={-1}>
              Adauga Prezenta
            </Button>
          </Link>
        </NextLink>
      </Flex>
      <PrezenteTable copil={data.copil as any} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Copil);
