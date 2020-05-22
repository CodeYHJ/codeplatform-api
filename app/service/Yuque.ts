import { Service } from 'egg';
import ServiceError from '../core/error/service/serviceError';
import { E400 } from '../core/error';
import { UpdateAccountProps } from '../../typings/type/service/yuque';

/**
 * Yuque Service
 */
export default class Yuque extends Service {
  /**
   *
   * @param {string} url - 基础请求
   */
  public async yuqueRequest(url) {
    const { ctx } = this;
    const tokenResult = await ctx.model.Auth.findOne({
      raw: true,
      attributes: ['credential'],
      where: { id: 1 },
    }).catch(err => {
      throw ServiceError.from(err);
    });
    if (!tokenResult) {
      throw new E400('请先用admin账户设置雨雀token');
    }
    const { credential: yuqueToken } = tokenResult;
    const requestUrl = 'https://www.yuque.com/api/v2' + url;
    const result = await this.ctx.curl(requestUrl, {
      headers: {
        'X-Auth-Token': yuqueToken,
        'User-Agent': 'blog',
      },
      dataType: 'json',
      contentType: 'application/json',
    });
    const {
      res = false,
      res: { statusCode },
      data: { data = false },
    } = result;
    if (!res) {
      this.logger.error(
        `雨雀连接报错：${requestUrl},res:${JSON.stringify(result)}`
      );
      throw new E400();
    }
    if (statusCode === 400) {
      this.logger.error(
        `雨雀连接报错(请求的参数不正确，或缺少必要信息，请对比文档)：${requestUrl},res:${JSON.stringify(
          result
        )}`
      );
      throw new E400();
    }
    if (statusCode === 401) {
      this.logger.error(
        `雨雀连接报错(需要用户认证的接口用户信息不正确)：${requestUrl},res:${JSON.stringify(
          result
        )}`
      );
      throw new E400();
    }
    if (statusCode === 403) {
      this.logger.error(
        `雨雀连接报错(缺少对应功能的权限)：${requestUrl},res:${JSON.stringify(
          result
        )}`
      );
      throw new E400();
    }
    if (statusCode === 404) {
      this.logger.error(
        `雨雀连接报错(数据不存在，或未开放)：${requestUrl},res:${JSON.stringify(
          result
        )}`
      );
      throw new E400();
    }
    if (statusCode === 500) {
      this.logger.error(
        `雨雀连接报错(服务器异常)：${requestUrl},res:${JSON.stringify(result)}`
      );
      throw new E400();
    }
    return data;
  }
  /**
   *
   * @param {UpdateAccountProps} data - 更新token
   */
  public async updateAccount(data: UpdateAccountProps) {
    const { userid } = data;
    let defaultData = Object.create(null);
    defaultData.oauthtype = 'yuque';
    defaultData = { defaultData, ...data };
    const isCreate = await this.ctx.model.Yuque.findOrCreate({
      where: { userid, oauthtype: 'yuque' },
      defaults: defaultData,
    })
      .spread((_user, created) => {
        return created;
      })
      .catch(err => {
        throw ServiceError.from(err);
      });
    if (!isCreate) {
      const dbResult = await this.ctx.model.Yuque.update(defaultData, {
        where: { userid, oauthtype: 'yuque' },
      }).catch(err => {
        throw ServiceError.from(err);
      });
      if (dbResult && dbResult.length) {
        return true;
      }
    }
  }
}
