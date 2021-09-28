import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import {
  PrezentaTopic,
  useDeletePrezentaTopicMutation,
} from "../generated/graphql";

interface PrezentaTopicBoxProps {
  prezentaTopic: PrezentaTopic | null;
}

export const PrezentaTopicBox: React.FC<PrezentaTopicBoxProps> = ({
  prezentaTopic,
}) => {
  const [, deletePrezentaTopic] = useDeletePrezentaTopicMutation();
  return prezentaTopic ? (
    <Flex>
      <Flex key={prezentaTopic.id} p={5} shadow="md" borderWidth="1px">
        <Flex>
          <Box w="350px" h="auto" resize="vertical">
            <Heading fontSize="xl" textAlign="center">
              {prezentaTopic.titlu}
            </Heading>
            <Text mw="350px" mt={4}>
              {prezentaTopic.detalii}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <VStack>
        <IconButton
          onClick={() => {
            deletePrezentaTopic({ id: prezentaTopic.id });
          }}
          aria-label="Edit PrezentaTopic"
          icon={<DeleteIcon />}
        />
      </VStack>
    </Flex>
  ) : null;
};
