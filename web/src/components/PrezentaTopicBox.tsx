import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { PrezentaTopic } from "../generated/graphql";
import { PrezentaTopicBoxButtons } from "./PrezentaTopicBoxButtons";

interface PrezentaTopicBoxProps {
  prezentaTopic: PrezentaTopic | null;
}

export const PrezentaTopicBox: React.FC<PrezentaTopicBoxProps> = ({
  prezentaTopic,
}) => {
  return prezentaTopic ? (
    <Flex>
      <Flex key={prezentaTopic.id} p={5} shadow="md" borderWidth="1px">
        <Box w="350px" h="auto" resize="vertical">
          <Text mw="350px" align="center">
            <Text as="i">{prezentaTopic.titlu}</Text>
          </Text>
          <Text mw="350px" mt={4}>
            {prezentaTopic.detalii}
          </Text>
        </Box>
      </Flex>
      <PrezentaTopicBoxButtons prezentaTopic={prezentaTopic} />
    </Flex>
  ) : null;
};
