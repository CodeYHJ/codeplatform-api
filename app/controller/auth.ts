import { S200 } from '../lib/index';
import { Controller } from 'egg';
export default class AuthController extends Controller {
  public async getToken() {
    const { ctx } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const result = await ctx.service.auth.getAllToken(userid);
    ctx.body = new S200({ tokenList: result });
  }
  public async setToken() {
    const { ctx } = this;
    const validateRule = {
      name: 'string',
      credential: 'string',
      oauthtype: { type: 'number', max: 3, min: 1 },
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    const { id: userid } = await ctx.getIdByRedis();
    const setDate = { userid, ...ctx.request.body };
    const result = await ctx.service.auth.setToken(setDate);
    ctx.body = new S200({ status: result });
  }
  public async updateToken() {
    const { ctx } = this;
    const validateRule = {
      id: 'number',
      name: 'string',
      credential: 'string',
      oauthtype: { type: 'number', max: 3, min: 1 },
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    const { id: userid } = await ctx.getIdByRedis();
    const setDate = { userid, ...ctx.request.body };
    const result = await ctx.service.auth.updateToken(setDate);
    ctx.body = new S200({ status: result });

  }
  public async deleteToken() {
    const { ctx } = this;
    const validateRule = {
      id: 'number',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    const result = await ctx.service.auth.deleteToken(ctx.request.body);
    ctx.body = new S200({ status: result });
  }
}
