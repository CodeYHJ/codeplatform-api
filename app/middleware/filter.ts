import { E401 } from '../lib/index';

module.exports = () => {
  return async function(ctx, next) {
    const whiteList = [ ' /', '/user/login', '/user/registered' ];
    const url = ctx.router.opts.routerPath || ctx.routerPath || ctx.path;
    if (!whiteList.includes(url)) {
      const isLogin = ctx.isAuthenticated();
      const redisKey = await ctx.cookies.get('EGG_SESS', ctx.sessionOptions);
      const redisValue = await ctx.app.redis.get(redisKey);
      if (!isLogin && !redisValue) {
        throw new E401();
      }
    }
    await next();
  };
};
