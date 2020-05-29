import { Service } from 'egg';
import { dbError } from '../lib/index';
import { E400 } from '../lib/index';

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
    try {
      const result = await this.ctx.model.transaction(async t => {
        const result = await ctx.model.Auth.findAll({
          attributes: ['name', 'id', 'credential', 'oauthType'],
          where: { userid: id },
          transaction: t,
        });
        return result;
      });
      return result;
    } catch (error) {
      throw dbError.from(error);
    }
  }
  /**
   *
   * @param {SetTokenRequest} tokenData - TokenData
   */
  public async setToken(tokenData) {
    const { ctx } = this;
    try {
      const result = await this.ctx.model.transaction(async t => {
        const result = await ctx.model.Auth.findOrCreate({
          where: { credential: tokenData.credential },
          transaction: t,
          defaults: tokenData,
        }).spread((token, created) => {
          return [token ? token.get({ plain: true }) : null, created];
        });
        return result;
      });

      if (Array.isArray(result) && result[1]) {
        return true;
      }
      throw new E400('已存在相同的token');
    } catch (error) {
      throw dbError.from(error);
    }
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
    }).catch(err => dbError.from(err));
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
      dbError.from(err)
    );
    return true;
  }
}
