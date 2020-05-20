import { Application } from 'egg';

export default (app: Application) => {
  // test
  // app.get('/', 'home.index');

  /**
   *
   * 用户
   *
   */

  // 登陆
  app.post('/user/login', 'user.Login');

  // 注册
  app.post('/user/registered', 'user.registered');

  // 登出
  app.post('/user/logout', 'user.loginOut');

  // 查找用户是否存在
  app.post('/user/findname', 'user.findname');

  // 更改密码、用户名、头像
  app.post('/user/updateuser', 'user.updateAccount');

  // 获取用户名字、头像
  app.get('/user/userinfo', 'user.getUserInfo');

  /**
   *
   * Auth
   */

  app.get('/auth/getToken', 'auth.getToken');

  app.post('/auth/setToken', 'auth.setToken');

  app.post('/auth/updateToken', 'auth.updateToken');

  app.post('/auth/deleteToken', 'auth.deleteToken');

  /**
   *,
   * 数据模块
   *
   */

  // 今天基本数据
  app.get('/chart/taskstoday', 'chart.getTaskNumToday');

  // 本周基本数据
  app.get('/chart/tasksweek', 'chart.getTaskNumInWeek');

  // 本月基本数据
  app.get('/chart/tasksmonth', 'chart.getTaskNumInMonth');

  /**
   *
   *
   * 任务模块
   *
   */

  // 获取所有未完成任务
  // app.get('/task/tasks', 'task.index');

  // 新增任务
  app.post('/task/addtask', 'task.addtask');

  // 更新任务
  app.post('/task/updatetask', 'task.updatetask');

  // 更新任务
  app.post('/task/closetask', 'task.closetask');

  // 删除微任务
  app.post('/task/deletemicrotask', 'task.deletemicrotask');

  /// //
  // 新增任务
  app.post('/task/create', 'task.createTask');
  // 获取所有任务
  app.get('/task/get', 'task.getTask');
  // 新增微任务
  app.post('/task/createMicro', 'task.createMicro');

  // 获取指定task
  app.get('/task/getTask', 'task.getTaskByTaskId');

  // 删除任务
  app.post('/task/deleteTask', 'task.deletetask');

  // 更新微任务状态
  app.post('/task/upMComplete', 'task.upDateMicroTaskStatus');

  // 更新微任务Dsc
  app.post('/task/upMdsc', 'task.upDateMicroTaskDsc');

  // 更新微任务优先级
  app.post('/task/upMlevel', 'task.upDateMicroTaskPriority');
  // 更新微任务优先级
  app.post('/task/upMmark', 'task.upDateMicroTaskRemark');
  /**
   *
   *
   * 雨雀
   *
   */

  // set token
  app.post('/yuque/settingtoken', 'yuque.setToken');

  // 外部获取所有文章
  app.get('/yuque/allArticles', 'yuque.getAll');

  // 外部获取指定文章
  app.get('/yuque/articleDsc', 'yuque.articleDsc');

  /**
   *
   * jenkins
   *
   */
  app.get('/jenkins/alltest', 'jenkins.getAll');
  app.get('/jenkins/testdsc', 'jenkins.getTestDsc');
};
