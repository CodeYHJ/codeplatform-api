import { Controller } from 'egg';

import { S200 } from '../core/error';

export default class UserController extends Controller {
  public async Login() {
    const { ctx, service } = this;
    const validate = { name: 'string', password: 'string' };
    await ctx.checkValidate(validate, ctx.request.body);
    const { name, password } = ctx.request.body;
    const result = await service.user.login(name, password);
    ctx.login(result);
    ctx.body = new S200({ user: result });
  }

  public async loginOut() {
    const { ctx } = this;
    await ctx.logout();
    ctx.body = new S200({ status: true });
  }

  public async registered() {
    const { ctx, service } = this;

    const validate = { name: 'string', password: 'string' };

    await ctx.checkValidate(validate, ctx.request.body);

    const { name, password } = ctx.request.body;

    const dbResult = await service.user.registered(name, password);

    ctx.login(dbResult);

    ctx.body = new S200({ user: dbResult });
  }

  public async findname() {
    const { ctx, service } = this;

    const validate = { name: 'string' };

    await ctx.checkValidate(validate, ctx.request.body);

    const { name } = ctx.request.body;

    const result = await service.user.findName(name);

    ctx.body = new S200({ status: result });
  }
  public async updateAccount() {
    const { ctx, service } = this;
    const validate = {
      name: 'string?',
      password: 'string?',
      avatar_url: 'string?',
    };
    await ctx.checkValidate(validate, ctx.request.body);
    const {
      name = false,
      password = false,
      avatar_url = false,
    } = ctx.request.body;
    const { id: userid } = await ctx.getIdByRedis();
    const requestData: any = {};
    requestData.userid = userid;
    if (name) requestData.name = name;
    if (password) requestData.password = password;
    if (avatar_url) requestData.avatar_url = avatar_url;
    const dbResult = await service.user.upDateAccount(requestData);
    const response = {
      name: false,
      password: false,
      avatar_url: false,
    };
    if (dbResult) {
      if (name) response.name = name;
      if (password) response.password = true;
      if (avatar_url) response.avatar_url = avatar_url;
      ctx.body = new S200(response);
    } else {
      ctx.body = new S200(response);
    }
  }
  public async getUserInfo() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const dbResult = await service.user.getUserInfo(userid);
    ctx.body = new S200({ user: dbResult });
  }
}
