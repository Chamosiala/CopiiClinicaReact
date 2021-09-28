import { Table, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { Copil } from "../generated/graphql";
import { PrezenteTableBody } from "./PrezenteTableBody";

interface PrezenteTableProps {
  copil: Copil | undefined;
}

export const PrezenteTable: React.FC<PrezenteTableProps> = ({ copil }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Data</Th>
          <Th isNumeric={true}>Prezent</Th>
        </Tr>
      </Thead>
      <PrezenteTableBody copil={copil} />
    </Table>
  );
};
