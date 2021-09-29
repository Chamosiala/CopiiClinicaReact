import Icon from "@chakra-ui/icon";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/layout";
import { Tbody, Td, Tr } from "@chakra-ui/table";
import NextLink from "next/link";
import React from "react";
import { usePrezenteQuery } from "../generated/graphql";

export const ToatePrezentele = ({}) => {
  const [{ data, fetching }] = usePrezenteQuery();

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
      </Tr>
    ));
  }

  return <Tbody>{body}</Tbody>;
};
