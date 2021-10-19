import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PrezentaTopic } from "../generated/graphql";
import { PrezentaTopicBoxButtons } from "./PrezentaTopicBoxButtons";
import { PrezentaTopicEditForm } from "./PrezentaTopicEditForm";

interface PrezentaTopicBoxProps {
  prezentaTopic: PrezentaTopic | null;
}

export const PrezentaTopicBox: React.FC<PrezentaTopicBoxProps> = ({
  prezentaTopic,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <PrezentaTopicEditForm
      prezentaTopic={prezentaTopic!}
      closeForm={() => {
        setIsEdit(false);
      }}
    />
  ) : (
    <Flex>
      <Flex key={prezentaTopic!.id} p={5} shadow="md" borderWidth="1px">
        <Box w="350px" h="auto" resize="vertical">
          <Text mw="350px" align="center">
            <Text as="i">{prezentaTopic!.titlu}</Text>
          </Text>
          <Text mw="350px" mt={4}>
            {prezentaTopic!.detalii}
          </Text>
        </Box>
      </Flex>
      <PrezentaTopicBoxButtons
        prezentaTopic={prezentaTopic!}
        handleEditClick={() => {
          setIsEdit(true);
        }}
      />
    </Flex>
  );
};
