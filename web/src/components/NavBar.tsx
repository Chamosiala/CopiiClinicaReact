import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="black" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="black">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2} color="black">
          {data.me.username}
        </Box>
        <Button
          color="black"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Log Out
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" top="0" zIndex={0} bg="orange" p={4} ml={"auto"}>
      <Box mr="auto">
        <NextLink href="/">
          <Link mr={2} color="black">
            Acasă
          </Link>
        </NextLink>
        <NextLink href="/copii">
          <Link mr={2} color="black">
            Copii
          </Link>
        </NextLink>
        <NextLink href="/prezente">
          <Link color="black">Prezente</Link>
        </NextLink>
      </Box>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
