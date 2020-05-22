import { Controller } from 'egg';
import { E400 } from '../core/error';

export default class BaseController extends Controller {
  public async check(rule, requestData) {
    const errors = await this.app.validator.validate(rule, requestData);
    if (errors) {
      this.ctx.logger.warn(errors);
      throw new E400('请求参数错误');
    }
  }

  public async getRequest() {
    const { ctx } = this;
    return ctx.query;
  }

  public async postRequest() {
    const { ctx } = this;
    return ctx.request.body;
  }
}
