import BaseController from './base';
import { S200 } from '../core/error';
export default class JenkinsController extends BaseController {
  public async getAll() {
    const { ctx } = this;
    const result = await ctx.service.jenkins.getAllTest();
    ctx.body = new S200({ list: result });
  }

  public async getTestDsc() {
    const { ctx } = this;
    const validateRule = {
      testname: 'string',
    };
    await this.check(validateRule, ctx.query);
    const { testname } = ctx.query;
    const result = await ctx.service.jenkins.getTestDsc(testname);
    ctx.body = new S200({ dscList: result });
  }
}
