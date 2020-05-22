import { app, assert } from 'egg-mock/bootstrap';

describe('updateTask()', () => {
  it('should updateTask schedule work fine', async () => {
    const runPass = await app.runSchedule('updatetask').catch(() => true);

    assert(runPass !== true);
  });
});
