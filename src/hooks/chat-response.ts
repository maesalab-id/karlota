// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (['create', 'patch'].indexOf(context.method) !== -1) {
      const { recipientId, senderId } = context.data;
      const sender = await context.app.service('users').get(senderId);
      const recipient = await context.app.service('users').get(recipientId);
      context.result.sender = sender;
      context.result.recipient = recipient;
    }
    return context;
  };
};
