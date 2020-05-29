// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportChart from '../../../app/controller/Chart';
import ExportTask from '../../../app/controller/Task';
import ExportUser from '../../../app/controller/User';
import ExportAuth from '../../../app/controller/auth';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    chart: ExportChart;
    task: ExportTask;
    user: ExportUser;
    auth: ExportAuth;
    home: ExportHome;
  }
}
