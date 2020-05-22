import { app } from 'egg-mock/bootstrap';


describe('test/app/controller/jenkins.test.ts', () => {
  describe('jenkins-getAll', () => {
    it('用户未授权', () => {
      return app
        .httpRequest()
        .get('/jenkins/getAll')
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          message: '没有授权，请登陆',
          code: '401',
        });
    });

  });
  describe('jenkins-getTestDsc', () => {
    it('用户未授权', () => {
      return app
        .httpRequest()
        .get('/jenkins/getTestDsc')
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          message: '没有授权，请登陆',
          code: '401',
        });
    });

  });
});
