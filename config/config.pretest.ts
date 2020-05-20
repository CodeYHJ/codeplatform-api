import { EggAppConfig, PowerPartial } from 'egg';
import * as path from 'path';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: 'mysql',
      host: '172.17.0.1',
      port: 3306,
      database: 'dev',
      username: 'root',
      password: 'example',
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
