import { Avatar, Button, createStyles, Group, Stack, Text, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { Conversation } from "./Conversation";
import { Header } from "./Header";

export const Room = () => {
  const params = useParams();
  const { classes } = useStyles();
  return (
    <Stack h="100%" spacing={0}>
      <div className={classes.header}>
        <Header />
      </div>
      <Stack className={classes.conversation}>
        <Conversation />
      </Stack>
      <Group className={classes.inputWrapper} spacing={"xs"} p="xs">
        <TextInput style={{ flexGrow: 1 }} />
        <Button>Send</Button>
      </Group>
    </Stack>
  )
}

const useStyles = createStyles((theme) => ({
  inputWrapper: {
    backgroundColor: "white"
  },
  conversation: {
    backgroundColor: theme.colors.blue[0],
    flexGrow: 1,
    position: "relative",
  },
  header: {
    backgroundColor: "white"
  }
}))