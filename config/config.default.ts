import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    // mysql
    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'dev',
      username: 'root',
      password: 'example',
    },
    // session配置
    session: {
      renew: true,
      key: 'EGG_SESS',
      maxAge: 24 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: true,
    },
    security: {
      csrf: {
        enable: false,
        headerName: 'x-csrf-token',
        ignoreJSON: false,
      },
      // domainWhiteList: [
      //   'https://pretest.codeyhj.cn',
      //   'https://admin.codeyhj.cn',
      //   'https://codeui.codeyhj.cn',
      // ],
    },
    // 跨域配置
    cors: {
      credentials: true,
      origin: ctx => ctx.get('origin'),
      allowMethods: 'GET,POST,OPTIONS',
    },
    // 参数验证配置
    validate: {
      convert: true,
      widelyUndefined: true,
    },
  };

  // override config from framework / plu gin
  // use for cookie  sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584204692957_7292';

  // add your egg config in here
  config.middleware = ['interceptErr', 'filter'];

  // add your special config in here
  const bizConfig = {
    // sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
