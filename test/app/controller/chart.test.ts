import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/chart.test.ts', () => {

  /**
     *
     * getTaskNumInMonth
     */
  describe('chartController-getTaskNumInMonth', () => {
    it('用户未授权', () => {
      return app
        .httpRequest()
        .get('/chart/taskstoday')
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          message: '没有授权，请登陆',
          code: '401',
        });
    });
    it('一切正常', () => {
      app.mockSession({
        user: { id: 1 },
      });
      return app
        .httpRequest()
        .get('/chart/taskstoday')
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          message: '没有授权，请登陆',
          code: '401',
          a: '2',
        });
    });

  });
});
