import BaseController from './base';
export default class HomeController extends BaseController {
  public async index() {
    const { ctx } = this;

    await ctx.service.yuque.yuqueRequest('/user');
    ctx.body = 1;
  }
}
