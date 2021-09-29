import { Tr, Td, Tbody, Button, Link, IconButton } from "@chakra-ui/react";
import React from "react";
import { useCopiiQuery, useDeleteCopilMutation } from "../generated/graphql";
import NextLink from "next/link";
import { DeleteIcon } from "@chakra-ui/icons";

interface CopiiTableBodyProps {}

export const CopiiTableBody: React.FC<CopiiTableBodyProps> = ({}) => {
  const [{ data, fetching }] = useCopiiQuery();
  const [, deleteCopil] = useDeleteCopilMutation();
  let body = null;

  if (fetching) {
    body = <Tr>loading...</Tr>;
  } else if (!data?.copii) {
    body = <Tr>no data.copii</Tr>;
  } else {
    body = data.copii.map((copil) =>
      !copil ? (
        <Tr>no copii</Tr>
      ) : (
        <Tr key={copil.id}>
          <Td>
            <NextLink href="/copil/[id]" as={`/copil/${copil.id}`}>
              <Link>
                {copil.nume} {copil.prenume}
              </Link>
            </NextLink>
          </Td>
          <Td>{copil.varsta}</Td>
          <NextLink
            href="/create-prezenta/[id]"
            as={`/create-prezenta/${copil.id}`}
          >
            <Button mr={2} as={Link}>
              Adauga Prezenta
            </Button>
          </NextLink>
          <IconButton
            colorScheme="red"
            onClick={() => {
              deleteCopil({ id: copil.id });
            }}
            aria-label="Delete Copil"
            icon={<DeleteIcon />}
          />
        </Tr>
      )
    );
  }

  return <Tbody>{body}</Tbody>;
};
