import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
  it('should post /', async () => {
    const result = await app
      .httpRequest()
      .get('/')
      .expect(200);
    assert(result.text === 'hi, egg');
  });
});
