import { Application } from '../declarations';
import users from './users/users.service';
import chats from './chats/chats.service';
import attachments from './attachments/attachments.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(chats);
  app.configure(attachments);
}
