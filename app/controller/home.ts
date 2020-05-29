import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;

    await ctx.service.yuque.yuqueRequest('/user');
    ctx.body = 1;
  }
}
