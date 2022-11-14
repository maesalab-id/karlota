import moment from 'moment/moment';

export const transformMessage = (user, data) => {
  const { createdAt, sender, content, id, status } = data;
  let alt = true;
  if (sender.id === user.id) alt = false;
  let timestamp = moment(createdAt).format('HH:mm A');
  const item = {
    name: sender.email,
    content: content,
    timestamp: timestamp,
    alt,
    id,
    status,
  };
  return item;
};
