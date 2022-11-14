import { useQuery } from '@tanstack/react-query';
import { useClient } from 'components/client';
import { LocalDB } from 'components/localDB';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

export const RoomContext = createContext({
  user: {},
  localforage: {},
});

export const RoomProvider = (props) => {
  const localDB = LocalDB();
  const params = useParams();
  const client = useClient();
  const userQuery = useQuery({
    queryKey: ['room', params.id],
    queryFn: async () => {
      let res = await client.service('users').get(params.id);
      return res;
    },
  });

  const getChats = useCallback(async () => {
    if (!client.user) return [];
    console.log(client.user);
    let messages = await localDB.messageStorageInstance.keys();
    messages = messages
      .filter((key) => {
        return (
          key.indexOf(`${params.id}.${client.user.id}`) !== -1 ||
          key.indexOf(`${client.user.id}.${params.id}`) !== -1
        );
      })
      .map(async (key) => {
        return await localDB.messageStorageInstance.getItem(key);
      });
    return await Promise.all(messages);
  }, [params.id, client.user]);

  const setChat = useCallback((data) => {
    localDB.messageStorageInstance.setItem(
      `${data.createdAt}-${data.sender.id}.${data.recipient.id}.${data.id}`,
      data
    );
  }, []);

  const room = {
    user: userQuery.data,
    userQuery: userQuery,

    getChats: getChats,
    setChat: setChat,
  };

  return <RoomContext.Provider {...props} value={room} />;
};

export const useRoom = () => {
  const room = useContext(RoomContext);
  return room;
};
