import localforage from 'localforage';
import { createNanoEvents } from 'nanoevents';

export class Messages {
  emitter;
  storage;

  constructor() {
    this.emitter = createNanoEvents();
    this.storage = localforage.createInstance({
      name: 'message-storage',
      storeName: 'messages',
    });
    this.on = this.emitter.on.bind(this.emitter);
  }

  async getBySenderRecipientId(senderId, recipientId) {
    let response = await this.storage.keys();
    response = response
      .filter((key) => {
        return (
          key.indexOf(`${senderId}.${recipientId}`) !== -1 ||
          key.indexOf(`${recipientId}.${senderId}`) !== -1
        );
      })
      .map(async (key) => {
        return await this.storage.getItem(key);
      });
    return await Promise.all(response);
  }
  async get(key) {
    return await this.storage.getItem(key);
  }
  // async set() {
  //   await messageStorageInstance.clear();
  // },
  async push(data) {
    await this.storage.setItem(
      `${data.createdAt}-${data.sender.id}.${data.recipient.id}.${data.id}`,
      data
    );
    this.emitter.emit('push', data);
  }
}
