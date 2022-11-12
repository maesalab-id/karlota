// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const chats = sequelizeClient.define(
    'chats',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('sent', 'delivered', 'read'),
        allowNull: false,
        defaultValue: 'sent',
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (chats as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    chats.belongsTo(models.users, {
      as: 'sender',
    });
    chats.belongsTo(models.users, {
      as: 'recipient',
    });
    chats.hasOne(models.attachments);
  };

  return chats;
}
