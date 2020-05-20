import { app, assert } from 'egg-mock/bootstrap';

describe('test/app/service/Jenkins.test.js', () => {

  describe('getAllTest()', () => {
    it('should get exists tests', async () => {
      const ctx = app.mockContext();
      const result = await ctx.service.jenkins.getAllTest();
      assert(result);
      assert(result.length >= 0);

    });
  });


  describe('getTestDsc()', async () => {
    it('should get exists test', async () => {
      const ctx = app.mockContext();
      const result = await ctx.service.jenkins.getTestDsc('test');
      assert(result);
      assert(result.length >= 0);
    });
    it('should get error when path not exists', async () => {
      const ctx = app.mockContext();
      const isErr = await ctx.service.jenkins.getTestDsc('as').catch(() => { return true; });
      assert(isErr === true);
    });
  });
});
