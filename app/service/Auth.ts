import { Service } from 'egg';
import ServiceError from '../core/error/service/serviceError';
import { E400 } from '../core/error';

/**
 *
 * Auth Service
 */
export default class AuthService extends Service {
  /**
   *
   * @param {number} id - userid
   */
  public async getAllToken(id) {
    const { ctx } = this;
    const result = await ctx.model.Auth.findAll({
      attributes: ['name', 'id', 'credential', 'oauthType'],
      where: { userid: id },
    }).catch(err => {
      ServiceError.from(err);
    });
    return result;
  }
  /**
   *
   * @param {SetTokenRequest} tokenData - TokenData
   */
  public async setToken(tokenData) {
    const { ctx } = this;
    const result = await ctx.model.Auth.findOrCreate({
      where: { credential: tokenData.credential },
      defaults: tokenData,
    })
      .spread((token, created) => {
        return [token ? token.get({ plain: true }) : null, created];
      })
      .catch(err => {
        ServiceError.from(err);
      });
    if (result[1]) {
      return true;
    }
    throw new E400('已存在相同的token');
  }
  /**
   *
   * @param {SetTokenRequest} tokenData - tokenData
   *
   */
  public async updateToken(tokenData) {
    const { ctx } = this;
    const result = await ctx.model.Auth.update(tokenData, {
      where: { id: tokenData.id },
    }).catch(err => ServiceError.from(err));
    if (result && result[0] === 1) {
      return true;
    }
    return false;
  }
  /**
   *
   * @param {number} tokenid - token id
   */
  public async deleteToken(tokenid) {
    const { ctx } = this;
    await ctx.model.Auth.destroy({ where: tokenid }).catch(err =>
      ServiceError.from(err)
    );
    return true;
  }
}
