import ServiceError from '../core/error/service/serviceError';
import { E400 } from '../core/error';

module.exports = {
  async getIdByRedis() {
    try {
      const redisKey = await this.cookies.get('EGG_SESS', this.sessionOptions);
      const redisValue = await this.app.redis.get(redisKey);
      if (typeof redisValue === 'string') {
        const userRedis = JSON.parse(redisValue);
        const {
          passport: { user },
        } = userRedis;
        return user;
      } else if (this.session.user) {
        const user = this.session.user;
        return user;
      }
    } catch (error) {
      throw ServiceError.from(error);
    }
  },
  async checkValidate(rule, requestData) {
    const errors = await this.app.validator.validate(rule, requestData);
    if (errors) {
      this.ctx.logger.warn(errors);
      throw new E400('请求参数错误');
    }
  },
};
