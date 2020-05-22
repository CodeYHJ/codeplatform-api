module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const { code = '400', message = '' } = err;
      if (code === '400') {
        ctx.body = { code, message };
      }
      if (code === '401') {
        ctx.body = { code, message };
      }
      if (code === '600') {
        ctx.body = { code, message: '网络故障，请稍后再试' };
        ctx.logger.error(err);
      }
    }
  };
};
