import localforage from 'localforage';

const messageStorageInstance = localforage.createInstance({
  name: 'message-storage',
  storeName: 'messages',
});

export const LocalDB = () => {
  return { messageStorageInstance };
};
