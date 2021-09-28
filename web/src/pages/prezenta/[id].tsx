import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { PrezentaTopicBox } from "../../components/PrezentaTopicBox";
import { PrezentaTopicForm } from "../../components/PrezentaTopicForm";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPrezentaFromUrl } from "../../utils/useGetPrezentaFromUrl";

export const Prezenta = ({}) => {
  const [{ data, error, fetching }] = useGetPrezentaFromUrl();
  const [tip, setTip] = useState("");
  useEffect(() => {
    setTip("");
  }, [data]);

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

  if (!data?.prezenta) {
    return (
      <Layout>
        <Box>Prezenta nu exista</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box mb={10}>
        <Heading textAlign="center">
          {data.prezenta.copil.nume} {data.prezenta.copil.prenume},{" "}
          {data.prezenta.copil.varsta}
        </Heading>
        <Heading fontSize="lg">
          <Text ml={550}>{data.prezenta.dataFrumoasa}</Text>
        </Heading>
      </Box>
      <Stack spacing={8}>
        <Flex>
          <Heading>Activitati</Heading>
          <Button
            ml="4"
            onClick={() => {
              if (tip != "Activitate") {
                setTip("Activitate");
              } else {
                setTip("");
              }
            }}
          >
            adauga
          </Button>
        </Flex>
        <VStack spacing={4}>
          {!data.prezenta.prezentaTopics ? null : (
            <>
              {data!.prezenta.prezentaTopics
                .filter((pT) => pT.tip === "Activitate")
                .map((pT) =>
                  !pT ? null : <PrezentaTopicBox prezentaTopic={pT} />
                )}
            </>
          )}
          {tip === "Activitate" ? (
            <PrezentaTopicForm prezentaId={data.prezenta.id} tip={tip} />
          ) : null}
        </VStack>
        <Flex>
          <Heading>Comportamente</Heading>
          <Button
            ml="4"
            onClick={() => {
              if (tip != "Comportament") {
                setTip("Comportament");
              } else {
                setTip("");
              }
            }}
          >
            adauga
          </Button>
        </Flex>
        <VStack spacing={4}>
          {!data.prezenta.prezentaTopics ? null : (
            <>
              {data!.prezenta.prezentaTopics
                .filter((pT) => pT.tip === "Comportament")
                .map((pT) =>
                  !pT ? null : <PrezentaTopicBox prezentaTopic={pT} />
                )}
            </>
          )}
          {tip === "Comportament" ? (
            <PrezentaTopicForm prezentaId={data.prezenta.id} tip={tip} />
          ) : null}
        </VStack>
        <Flex>
          <Heading>Tehnici</Heading>
          <Button
            ml="4"
            onClick={() => {
              if (tip != "Tehnica") {
                setTip("Tehnica");
              } else {
                setTip("");
              }
            }}
          >
            adauga
          </Button>
        </Flex>
        <VStack spacing={4}>
          {!data.prezenta.prezentaTopics ? null : (
            <>
              {data!.prezenta.prezentaTopics
                .filter((pT) => pT.tip === "Tehnica")
                .map((pT) =>
                  !pT ? null : <PrezentaTopicBox prezentaTopic={pT} />
                )}
            </>
          )}
          {tip === "Tehnica" ? (
            <PrezentaTopicForm prezentaId={data.prezenta.id} tip={tip} />
          ) : null}
        </VStack>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Prezenta);
