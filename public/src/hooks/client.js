import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import FeathersSocketio from "@feathersjs/socketio-client";
import FeathersAuth from "@feathersjs/authentication-client";
const socket = io("http://localhost:3030");
const client = feathers();

client.configure(FeathersSocketio(socket));
client.configure(FeathersAuth({
  storageKey: "accessToken"
}));

export const useClient = () => {
  return {
    authenticate: client.authenticate,
    reAuthenticate: client.reAuthenticate,

    service: client.service.bind(client),
    feathers: client,
  };
};
