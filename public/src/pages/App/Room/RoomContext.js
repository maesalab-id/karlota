import { useQuery } from '@tanstack/react-query';
import { useClient } from 'components/client';
import { useLocalDB } from 'components/localDB';
import { createContext, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';

export const RoomContext = createContext({
  user: {},
  localforage: {},
});

export const RoomProvider = (props) => {
  const localDB = useLocalDB();
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
    return await localDB.messages.getBySenderRecipientId(
      params.id,
      client.user.id
    );
  }, [params.id, client.user]);

  const setChat = useCallback((data) => {
    localDB.messages.push(data);
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
