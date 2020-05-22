import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    // redis配置
    // redis: {
    //   client: {
    //     host: 'localhost',
    //     port: 6379,
    //     password: '',
    //     db: 0,
    //   },
    //   agent: true,
    // },
    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'dev',
      username: 'root',
      password: 'example',
    },
  };
  return config;
};
