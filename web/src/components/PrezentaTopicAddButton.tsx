import { Button } from "@chakra-ui/react";
import React from "react";

interface PrezentaTopicAddButtonProps {
  handleClick: any;
}

export const PrezentaTopicAddButton: React.FC<PrezentaTopicAddButtonProps> = ({
  handleClick,
}) => {
  return (
    <Button zIndex={-1} ml="4" onClick={handleClick()}>
      Adauga
    </Button>
  );
};
