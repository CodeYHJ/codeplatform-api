import { EggAppConfig, PowerPartial } from 'egg';
import * as path from 'path';

export default appInfo => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: 'mysql',
      host: '172.17.0.1',
      port: 3306,
      database: 'pro',
      username: 'root',
      password: 'example',
    },
    // redis配置
    redis: {
      client: {
        host: '172.17.0.1',
        port: 6379,
        password: '',
        db: 1,
      },
      agent: true,
    },
    security: {
      csrf: {
        enable: false,
        headerName: 'x-csrf-token',
        ignoreJSON: false,
      },
    },
    logger: {
      appLogName: `appLog/${appInfo.name}-web.log`,
      coreLogName: 'coreLog/egg-web.log',
      agentLogName: 'agentLog/egg-agent.log',
      errorLogName: 'errorLog/common-error.log',
      outputJSON: true,
      dir: '/egg/egglogs',
    },
    customLogger: {
      scheduleLogger: {
        consoleLevel: 'NONE',
        file: path.join('/egg/egglogs', 'scheduleLog', 'egg-schedule.log'),
        outputJSON: true,
      },
    },
  };
  return config;
};