import 'egg';
import 'egg-sequelize';

/**
 * controller
 */
import { BaseController } from './type/controller/base';
import { ChartController } from './type/controller/chart';
import { TaskController } from './type/controller/task';
import { UserController } from './type/controller/user';
import { YuqueController } from './type/controller/yuque';
import JenkinsController from '../app/controller/jenkins';

/**
 * service
 */

import { ChartService } from './type/service/chart';
import { TaskService } from './type/service/task';
import { UserService } from './type/service/user';
import { GiteeService } from './type/service/gitee';
import { JenkinsService } from './type/service/jenkins';
import { UpdateService } from './type/service/update';
import { AuthService } from './type/service/auth';

import { Helper } from './type/extend/helper';

declare module 'egg' {
  interface IController {
    base: BaseController;
    chart: ChartController;
    task: TaskController;
    user: UserController;
    yueque: YuqueController;
    jenkins: JenkinsController;
  }
  interface IService {
    chart: ChartService;
    task: TaskService;
    user: UserService;
    jenkins: JenkinsService;
    update: UpdateService;
    auth: AuthService;
  }
  // interface Context extends ExtendContextType { }
  interface IHelper extends Helper {}
  interface IMiddleware {}
}
