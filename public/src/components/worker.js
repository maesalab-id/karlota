import { useEffect } from 'react';
import { useClient } from './client';
import { MESSAGE_STATUS } from './constants';
import { useLocalDB } from './localDB';

export const WorkerProvider = ({ children }) => {
  const client = useClient();
  const localDB = useLocalDB();

  useEffect(() => {
    const onCreated = (data) => {
      localDB.messages.push(data);
      client.service('chats').patch(data.id, {
        status: MESSAGE_STATUS['DELIVERED'],
      });
    };
    const onPatched = (data) => {
      console.log(data);
      // localDB.messages.push(data);
    };
    client.service('chats').on('created', onCreated);
    client.service('chats').on('patched', onPatched);
    return () => {
      client.service('chats').removeListener('created', onCreated);
      client.service('chats').removeListener('patched', onPatched);
    };
  }, []);

  return children;
};
