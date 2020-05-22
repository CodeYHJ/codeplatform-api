import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Task.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('获取所有任务正常', async () => {
    const result = await ctx.service.task.getTaskById(0);
    assert(result instanceof Array);
  });
});
