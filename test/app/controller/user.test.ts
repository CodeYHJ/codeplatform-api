// import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
  /**
     * login
     */
  describe('POSt /login', () => {
    it('参数格式错误，正常返回', () => {
      return app
        .httpRequest()
        .post('/user/login')
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          data: null,
          status: false,
          message: '请求参数错误',
          code: 4000,
        });
    });
    it('密码、用户名错误，正常返回', () => {
      return app
        .httpRequest()
        .post('/user/login')
        .send({ name: '123213', password: '123213' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          data: null,
          status: false,
          message: '密码或账户错误',
          code: 4001,
        });
    });
    it('登录成功', () => {
      return app
        .httpRequest()
        .post('/user/login')
        .send({ name: '123', password: '123' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          data: { id: 1, name: '123' },
          status: true,
          message: 'success',
          code: 2000,
        });
    });
  });

  /**
     * registered
     */
  describe('POST /registered', () => {
    it('参数格式错误，正常返回', async () => {
      return app
        .httpRequest()
        .post('/user/registered')
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          data: null,
          status: false,
          message: '请求参数错误',
          code: 4000,
        });
    });
    it('注册用户冲突', () => {
      return app
        .httpRequest()
        .post('/user/registered')
        .send({ name: '123', password: '123' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect({
          data: null,
          status: false,
          message: '用户已存在',
          code: 2001,
        });
    });
  });
});
