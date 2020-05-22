import ServiceError from '../core/error/service/serviceError';

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
};
