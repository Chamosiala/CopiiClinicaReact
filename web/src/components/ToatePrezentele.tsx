import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Tbody, Td, Tr } from "@chakra-ui/table";
import NextLink from "next/link";
import React from "react";
import {
  useDeletePrezentaMutation,
  usePrezenteQuery,
} from "../generated/graphql";

export const ToatePrezentele = ({}) => {
  const [{ data, fetching }] = usePrezenteQuery();
  const [, deletePrezenta] = useDeletePrezentaMutation();

  let body = null;

  if (fetching) {
    body = <Tr>loading...</Tr>;
  } else if (!data?.prezente) {
    body = <Tr>Nicio prezenta/absenta</Tr>;
  } else {
    body = data.prezente.map((prezenta) => (
      <Tr key={prezenta.id}>
        <Td>
          <NextLink href="/copil/[id]" as={`/copil/${prezenta.copilId}`}>
            <Link>
              {prezenta.copil.nume} {prezenta.copil.prenume}
            </Link>
          </NextLink>
        </Td>
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
        <Flex className="rowDeleteEditButtons" pt="8px" ml={5}>
          <IconButton
            mr={2}
            colorScheme="red"
            onClick={() => {
              deletePrezenta({ id: prezenta.id });
            }}
            aria-label="Delete Prezenta"
            icon={<DeleteIcon />}
          />
          <NextLink href="/">
            <IconButton
              colorScheme="orange"
              aria-label="Edit Prezenta"
              icon={<EditIcon />}
            />
          </NextLink>
        </Flex>
      </Tr>
    ));
  }

  return <Tbody>{body}</Tbody>;
};
