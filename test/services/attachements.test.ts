import assert from 'assert';
import app from '../../src/app';

describe('\'attachements\' service', () => {
  it('registered the service', () => {
    const service = app.service('attachements');

    assert.ok(service, 'Registered the service');
  });
});
