// Initializes the `attachments` service on path `/attachments`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Attachments } from './attachments.class';
import createModel from '../../models/attachments.model';
import hooks from './attachments.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'attachments': Attachments & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/attachments', new Attachments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('attachments');

  service.hooks(hooks);
}
