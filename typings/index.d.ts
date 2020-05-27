import 'egg';
import 'egg-sequelize';

/**
 * controller
 */
import { ChartController } from './type/controller/chart';
import { TaskController } from './type/controller/task';
import { UserController } from './type/controller/user';

/**
 * service
 */

import { ChartService } from './type/service/chart';
import { TaskService } from './type/service/task';
import { UserService } from './type/service/user';
import { UpdateService } from './type/service/update';
import { AuthService } from './type/service/auth';

import { Helper } from './type/extend/helper';

declare module 'egg' {
  interface IController {
    chart: ChartController;
    task: TaskController;
    user: UserController;
  }
  interface IService {
    chart: ChartService;
    task: TaskService;
    user: UserService;
    update: UpdateService;
    auth: AuthService;
  }
  // interface Context extends ExtendContextType { }
  interface IHelper extends Helper {}
  interface IMiddleware {}
}
