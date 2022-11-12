import assert from 'assert';
import app from '../../src/app';

describe('\'attachments\' service', () => {
  it('registered the service', () => {
    const service = app.service('attachments');

    assert.ok(service, 'Registered the service');
  });
});
