import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Tr, Td, Tbody, Button, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { Copil } from "../generated/graphql";
import NextLink from "next/link";

interface PrezenteTableBodyProps {
  copil: Copil | undefined;
}

export const PrezenteTableBody: React.FC<PrezenteTableBodyProps> = ({
  copil,
}) => {
  const prezente = copil?.prezente;
  console.log(prezente);

  if (!prezente) {
    return (
      <Tbody>
        <Tr>Nicio prezenta/absenta</Tr>
      </Tbody>
    );
  }

  return (
    <Tbody>
      {prezente!.map((prezenta) =>
        !prezenta ? (
          <Tr>Nicio prezenta/absenta</Tr>
        ) : (
          <Tr key={prezenta.id}>
            <Td>
              <NextLink href="/prezenta/[id]" as={`/prezenta/${prezenta.id}`}>
                <Link>{prezenta.dataFrumoasa}</Link>
              </NextLink>
            </Td>
            <Td isNumeric={true}>
              {prezenta.prezent ? (
                <Icon mr={10} as={CheckIcon} />
              ) : (
                <Icon as={CloseIcon} />
              )}
            </Td>
          </Tr>
        )
      )}
    </Tbody>
  );
};
