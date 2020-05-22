import BaseController from './base';
import { S200 } from '../core/error';

export default class YuqueController extends BaseController {
  public async setToken() {
    const { ctx, service } = this;
    const validateRule = {
      token: 'string',
    };
    await this.check(validateRule, ctx.request.body);

    const { id: userid } = await ctx.getIdByRedis();

    const { token } = ctx.request.body;

    const yuqueUserInfo = await ctx.service.yuque.yuqueRequest('/user');

    const { id, avatar_url, name } = yuqueUserInfo;

    const serviceData = {
      credential: token,
      oauthid: id,
      avatar_url,
      name,
      userid,
    };

    const dbResult = await service.yuque.updateAccount(serviceData);

    ctx.body = new S200({ status: dbResult });
  }

  public async getAll() {
    const { ctx } = this;
    // const { yuqueid } = await ctx.getIdByRedis();
    // const yuqueid = 254136;
    const blogid = 961488;
    // const result = await this.yuqueRequest(`/users/${yuqueid}/repos/`);
    const result = await ctx.service.yuque.yuqueRequest(
      `/repos/${blogid}/docs`
    );
    ctx.body = new S200({ list: result });
  }
  public async articleDsc() {
    const { ctx } = this;
    const validate = { slug: 'string' };
    await this.check(validate, ctx.query);
    const { slug } = ctx.query;
    const blogid = 961488;
    const result = await ctx.service.yuque.yuqueRequest(
      `/repos/${blogid}/docs/${slug}`
    );
    ctx.body = new S200({ article: result });
  }
}
