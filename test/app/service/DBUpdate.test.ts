import { app, assert } from 'egg-mock/bootstrap';

describe('test/app/service/DBUpdateService.test.js', () => {

  describe('findTodayEndTime()', () => {

    it('should get exists data', async () => {
      const ctx = app.mockContext();
      const result = await ctx.service.dBUpdate.findTodayEndTime();
      assert(result);
    });

  });

  describe('findDaydily()', () => {

    it('should get exists data', async () => {
      const ctx = app.mockContext();
      const result = await ctx.service.dBUpdate.findDaydily();
      assert(result);
    });

  });

  // describe('updateList()', () => {

  //   it('get emty [] should not run', async () => {
  //     const ctx = app.mockContext();
  //     const isErr = await ctx.service.dBUpdate.updateList([]).catch(() => true);
  //     assert(isErr !== true);
  //   });

  //   it('should pass', async () => {
  //     const ctx = app.mockContext();
  //     const data = [{
  //       id: 19,
  //       userid: 1,
  //       name: 'asd测试',
  //       frequency: 0,
  //       complete: 0,
  //       type: 1,
  //       starttime: '2020-04-28',
  //       endtime: '2020-04-28',
  //       microtasks: [
  //         { id: 54, dsc: 'asd', complete: 0 },
  //       ],
  //     }];
  //     const isErr = await ctx.service.dBUpdate.updateList(data).catch(() => true);
  //     assert(isErr !== true);
  //   });

  // });

  // describe('updateFrequncyList()', () => {

  //   it('get emty [] should not run', async () => {
  //     const ctx = app.mockContext();
  //     const isErr = await ctx.service.dBUpdate.updateList([]).catch(() => true);
  //     assert(isErr !== true);
  //   });

  //   it('should pass', async () => {
  //     const ctx = app.mockContext();
  //     const data = [{
  //       id: 1,
  //       userid: 1,
  //       name: '123',
  //       frequency: 1,
  //       complete: 0,
  //       type: 2,
  //       starttime: null,
  //       endtime: null,
  //       create_at: '2020-04-11T05:50:47.000Z',
  //       update_at: '2020-04-19T06:01:51.000Z',
  //       microtasks: [
  //         {
  //           id: 1,
  //           taskid: 1,
  //           dsc: 'asd',
  //           complete: 0,
  //         },
  //         {
  //           id: 6,
  //           taskid: 1,
  //           dsc: '123',
  //           complete: 0,
  //         },
  //       ],
  //     }];
  //     const isErr = await ctx.service.dBUpdate.updateFrequncyList(data).catch(() => true);
  //     assert(isErr !== true);
  //   });
  // });

  describe('cleanEmtyTask()', () => {
    it('should not fail', async () => {
      const ctx = app.mockContext();
      const isErr = await ctx.service.dBUpdate.cleanEmtyTask().catch(() => true);
      assert(isErr !== true);
    });
  });

  describe('updateDay()', () => {
    it('should not fail', async () => {
      const ctx = app.mockContext();
      const isErr = await ctx.service.dBUpdate.updateDay().catch(() => true);
      assert(isErr !== true);
    });
  });

  describe('updateDaily()', () => {
    it('should not fail', async () => {
      const ctx = app.mockContext();
      const isErr = await ctx.service.dBUpdate.updateDaily().catch(() => true);
      assert(isErr !== true);
    });
  });

});
