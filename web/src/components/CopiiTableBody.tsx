import { Tr, Td, Tbody, Button, Link, IconButton } from "@chakra-ui/react";
import React from "react";
import { useCopiiQuery, useDeleteCopilMutation } from "../generated/graphql";
import NextLink from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
        <Tr>Niciun copil</Tr>
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
            <Button colorScheme="orange" mr={2} as={Link}>
              Adauga prezenta
            </Button>
          </NextLink>
          <IconButton
            mr={2}
            colorScheme="red"
            onClick={() => {
              deleteCopil({ id: copil.id });
            }}
            aria-label="Delete Copil"
            icon={<DeleteIcon />}
          />
          <NextLink href="/copil/edit/[id]" as={`/copil/edit/${copil.id}`}>
            <IconButton
              colorScheme="orange"
              aria-label="Edit Copil"
              icon={<EditIcon />}
            />
          </NextLink>
        </Tr>
      )
    );
  }

  return <Tbody>{body}</Tbody>;
};
