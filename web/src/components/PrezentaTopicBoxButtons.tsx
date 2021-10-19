import { IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/layout";
import React from "react";
import {
  PrezentaTopic,
  useDeletePrezentaTopicMutation,
} from "../generated/graphql";

interface PrezentaTopicBoxButtonsProps {
  prezentaTopic: PrezentaTopic;
  handleEditClick: VoidFunction;
}

export const PrezentaTopicBoxButtons: React.FC<PrezentaTopicBoxButtonsProps> =
  ({ prezentaTopic, handleEditClick }) => {
    const [, deletePrezentaTopic] = useDeletePrezentaTopicMutation();
    return (
      <VStack ml={1}>
        <IconButton
          colorScheme="red"
          onClick={() => {
            deletePrezentaTopic({ id: prezentaTopic.id });
          }}
          aria-label="Delete PrezentaTopic"
          icon={<DeleteIcon />}
        />
        <IconButton
          colorScheme="orange"
          onClick={() => {
            handleEditClick();
          }}
          aria-label="Edit PrezentaTopic"
          icon={<EditIcon />}
        />
      </VStack>
    );
  };
