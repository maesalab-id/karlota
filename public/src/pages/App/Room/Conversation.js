import { useCallback, useEffect, useState } from 'react';
import { useList } from 'react-use';
import localforage from 'localforage';
import { createStyles } from '@mantine/core';
import { useClient } from 'components/client';
import { ChatBaloon } from './ChatBaloon';
import { useRoom } from './RoomContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';

export const Conversation = () => {
  const params = useParams();
  const { classes } = useStyles();
  const client = useClient();

  const [list, listFn] = useList([]);

  const transformMessage = (data) => {
    const { createdAt, sender, content, id } = data;
    let alt = true;
    if (sender.id === client.user.id) alt = false;
    let timestamp = moment(createdAt).format('HH:mm A');
    const item = {
      name: sender.email,
      content: content,
      timestamp: timestamp,
      alt,
      id,
    };
    return item;
  };

  const messagesQuery = useQuery(
    [`messages-${params.id}.${client.user.id}`],
    async () => {
      let res = await room.getChats();
      listFn.set(res.map(transformMessage));
      return res;
    }
  );

  const room = useRoom();

  useEffect(() => {
    const onCreated = (data) => {
      listFn.push(transformMessage(data));
      room.setChat(data);
    };
    client.service('chats').on('created', onCreated);
    return () => {
      client.service('chats').removeListener('created', onCreated);
    };
  }, [client, messagesQuery]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {list.map(({ id, name, alt, timestamp, content }) => (
          <ChatBaloon
            key={id}
            name={name}
            timestamp={timestamp}
            alt={alt}
            content={content}
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
