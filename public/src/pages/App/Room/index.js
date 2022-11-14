import { createStyles, Stack } from '@mantine/core';
import { useClient } from 'components/client';
import { Conversation } from './Conversation';
import { Header } from './Header';
import { InputBox } from './InputBox';
import { RoomProvider } from './RoomContext';

export const Room = () => {
  const { classes } = useStyles();
  const client = useClient();

  return (
    <RoomProvider>
      <Stack h="100%" spacing={0}>
        <div className={classes.header}>
          <Header />
        </div>
        <Stack className={classes.conversation}>
          {client.user && <Conversation />}
        </Stack>
        <div className={classes.inputBox}>
          <InputBox />
        </div>
      </Stack>
    </RoomProvider>
  );
};

const useStyles = createStyles((theme) => ({
  inputBox: {
    backgroundColor: 'white',
  },
  conversation: {
    backgroundColor: theme.colors.yellow[0],
    flexGrow: 1,
    position: 'relative',
  },
  header: {
    backgroundColor: 'white',
    height: 62,
  },
}));
