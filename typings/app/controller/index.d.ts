// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportChart from '../../../app/controller/Chart';
import ExportTask from '../../../app/controller/Task';
import ExportUser from '../../../app/controller/User';
import ExportYuque from '../../../app/controller/Yuque';
import ExportAuth from '../../../app/controller/auth';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';
import ExportJenkins from '../../../app/controller/jenkins';

declare module 'egg' {
  interface IController {
    chart: ExportChart;
    task: ExportTask;
    user: ExportUser;
    yuque: ExportYuque;
    auth: ExportAuth;
    base: ExportBase;
    home: ExportHome;
    jenkins: ExportJenkins;
  }
}
