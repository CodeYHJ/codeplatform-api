// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportBase from '../../../app/controller/base';
import ExportChart from '../../../app/controller/Chart';
import ExportHome from '../../../app/controller/home';
import ExportJenkins from '../../../app/controller/jenkins';
import ExportTask from '../../../app/controller/Task';
import ExportUser from '../../../app/controller/User';
import ExportYuque from '../../../app/controller/Yuque';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    base: ExportBase;
    chart: ExportChart;
    home: ExportHome;
    jenkins: ExportJenkins;
    task: ExportTask;
    user: ExportUser;
    yuque: ExportYuque;
  }
}
