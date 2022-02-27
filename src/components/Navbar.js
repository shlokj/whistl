import React from "react";
import { Flex, Heading, HStack, IconButton, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import acorn from "../assests/acorn.svg";

export default function Navbar({ createClick, profileClick }) {
  return (
    <HStack
      height="4em"
      width="100%"
      alignContent="center"
      justifyContent="center"
      bg="darkGreen"
    >
      <Flex
        width="100%"
        margin="0 0.5em"
        justifyContent="space-between"
        alignContent="center"
        flexGrow="0"
      >
        <IconButton
          color="white"
          icon={<Image src={acorn} alt="acorn" boxSize="35px" />}
          variant="ghost"
          _hover={{ bg: "none" }}
          onClick={createClick}
        />
        <Heading as="h1" color="white" fontFamily="Recoleta">
          whistl
        </Heading>
        <IconButton
          color="white"
          icon={<FontAwesomeIcon icon={faUser} />}
          variant="ghost"
          _hover={{ bg: "none" }}
          onClick={profileClick}
        />
      </Flex>
    </HStack>
  );
}
