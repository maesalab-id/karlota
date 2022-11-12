import { Container, Flex } from "@mantine/core";
import { Contact } from "./contact";
import { Room } from "./room";

export const Chat = () => {
  return (
    <Container>
      <Flex h={"50vh"}>
        <Contact />
        <Room />
      </Flex>
    </Container>
  );
};
