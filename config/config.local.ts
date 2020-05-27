import { EggAppConfig, PowerPartial } from 'egg';

export default appInfo => {
  const config: PowerPartial<EggAppConfig> = {
    // redis配置
    redis: {
      client: {
        host: 'www.codeyhj.top',
        port: 6379,
        password: '',
        db: 0,
      },
      agent: true,
    },
    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'dev',
      username: 'root',
      password: '123456',
    },
    security: {
      csrf: {
        enable: false,
        headerName: 'x-csrf-token',
        ignoreJSON: true,
      },
    },
    logger: {
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
      outputJSON: true,
    },
  };
  return config;
};
