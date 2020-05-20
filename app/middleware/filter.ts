import { E401 } from '../core/error';

module.exports = () => {
  return async function(ctx, next) {
    const whiteList = [ '/', '/user/login', '/user/registered', '/user/logout', '/yuque/allArticles', '/yuque/articleDsc' ];
    const url = ctx.router.opts.routerPath || ctx.routerPath || ctx.path;
    if (!whiteList.includes(url)) {
      const isLogin = ctx.isAuthenticated();
      if (!isLogin) {
        throw new E401();
      }
    }
    await next();
  };
};
