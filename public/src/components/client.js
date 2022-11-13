import { createContext, useContext } from "react";
import io from "socket.io-client";
import Feathers from "@feathersjs/feathers";
import FeathersSocketio from "@feathersjs/socketio-client";
import FeathersAuth from "@feathersjs/authentication-client";
const socket = io("http://localhost:3030");
const feathers = Feathers();

feathers.configure(FeathersSocketio(socket));
feathers.configure(FeathersAuth({
  storageKey: "accessToken"
}));

export const ClientContext = createContext(null);

export const ClientProvider = (props) => {
  return <ClientContext.Provider {...props} value={feathers} />
}

export const useClient = () => {
  const client = useContext(ClientContext);
  return {
    authenticate: client.authenticate,
    reAuthenticate: client.reAuthenticate,

    service: client.service.bind(client),
    feathers: client,
  };
};
