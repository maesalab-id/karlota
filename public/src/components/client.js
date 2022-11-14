import { createContext, useCallback, useContext, useState } from 'react';
import io from 'socket.io-client';
import Feathers from '@feathersjs/feathers';
import FeathersSocketio from '@feathersjs/socketio-client';
import FeathersAuth from '@feathersjs/authentication-client';
const socket = io('http://localhost:3030');
const feathers = Feathers();

feathers.configure(FeathersSocketio(socket));
feathers.configure(
  FeathersAuth({
    storageKey: 'accessToken',
  })
);

export const FeathersContext = createContext(feathers);
export const FeathersProvider = (props) => {
  return <FeathersContext.Provider {...props} value={feathers} />;
};

export const ClientContext = createContext(null);

export const ClientProvider = (props) => {
  const feathers = useContext(FeathersContext);
  const [user, setUser] = useState(null);

  const authenticate = useCallback(
    async (data) => {
      let res = await feathers.authenticate(data);
      setUser(res.user);
      return res;
    },
    [feathers]
  );

  const reAuthenticate = useCallback(async () => {
    let res = await feathers.reAuthenticate();
    console.log(res.user);
    setUser(res.user);
    return res;
  }, [feathers]);

  return (
    <ClientContext.Provider
      {...props}
      value={{
        authenticate,
        reAuthenticate,

        service: feathers.service.bind(feathers),
        feathers: feathers,

        user: user,
      }}
    />
  );
};

export const useFeathers = () => {};

export const useClient = () => {
  const client = useContext(ClientContext);
  return client;
};
