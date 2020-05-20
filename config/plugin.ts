import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // orm插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // redis插件
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // sesion-redis插件
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 鉴权插件
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  // // 参数验证插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
