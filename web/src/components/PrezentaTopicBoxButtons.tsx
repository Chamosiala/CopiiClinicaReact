import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/layout";
import React from "react";
import {
  PrezentaTopic,
  useDeletePrezentaTopicMutation,
} from "../generated/graphql";

interface PrezentaTopicBoxButtonsProps {
  prezentaTopic: PrezentaTopic;
}

export const PrezentaTopicBoxButtons: React.FC<PrezentaTopicBoxButtonsProps> =
  ({ prezentaTopic }) => {
    const [, deletePrezentaTopic] = useDeletePrezentaTopicMutation();
    return (
      <VStack>
        <IconButton
          colorScheme="red"
          onClick={() => {
            deletePrezentaTopic({ id: prezentaTopic.id });
          }}
          aria-label="Delete PrezentaTopic"
          icon={<DeleteIcon />}
        />
      </VStack>
    );
  };
