// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportChart from '../../../app/controller/Chart';
import ExportHome from '../../../app/controller/home';
import ExportTask from '../../../app/controller/Task';
import ExportUser from '../../../app/controller/User';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    chart: ExportChart;
    home: ExportHome;
    task: ExportTask;
    user: ExportUser;
  }
}
