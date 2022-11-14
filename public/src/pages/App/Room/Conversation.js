import { useList } from 'react-use';
import { createStyles } from '@mantine/core';
import { useClient } from 'components/client';
import { ChatBaloon } from './ChatBaloon';
import { useRoom } from './RoomContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { transformMessage } from 'components/utility/transformMessage';
import { useEffect } from 'react';
import { useLocalDB } from 'components/localDB';

export const Conversation = () => {
  const params = useParams();
  const { classes } = useStyles();
  const client = useClient();
  const localDB = useLocalDB();

  const [list, listFn] = useList([]);

  const messagesQuery = useQuery(
    [`messages-${params.id}.${client.user.id}`],
    async () => {
      let res = await room.getChats();
      listFn.set(res.map((data) => transformMessage(client.user, data)));
      return res;
    }
  );

  useEffect(() => {
    const unBindOnPush = localDB.messages.on('push', (data) => {
      let message = transformMessage(client.user, data);
      listFn.push(message);
    });
    return () => {
      unBindOnPush();
    };
  }, [client.user]);

  const room = useRoom();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {list.map(({ id, name, alt, timestamp, content, status }) => (
          <ChatBaloon
            key={id}
            name={name}
            timestamp={timestamp}
            alt={alt}
            content={content}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    padding: `${theme.spacing.md}px 0`,
  },
  wrapper: {
    position: 'absolute',
    inset: 0,
    overflowX: 'hidden',
  },
}));
