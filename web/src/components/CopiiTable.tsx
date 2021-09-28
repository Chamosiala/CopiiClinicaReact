import { Table, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { CopiiTableBody } from "./CopiiTableBody";

interface CopiiTableProps {}

export const CopiiTable: React.FC<CopiiTableProps> = ({}) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nume</Th>
          <Th>Varsta</Th>
        </Tr>
      </Thead>
      <CopiiTableBody />
    </Table>
  );
};
