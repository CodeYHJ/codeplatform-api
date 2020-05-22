// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/Auth';
import ExportChart from '../../../app/service/Chart';
import ExportTask from '../../../app/service/Task';
import ExportUpdate from '../../../app/service/Update';
import ExportUser from '../../../app/service/User';
import ExportYuque from '../../../app/service/Yuque';
import ExportJenkins from '../../../app/service/jenkins';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    chart: AutoInstanceType<typeof ExportChart>;
    task: AutoInstanceType<typeof ExportTask>;
    update: AutoInstanceType<typeof ExportUpdate>;
    user: AutoInstanceType<typeof ExportUser>;
    yuque: AutoInstanceType<typeof ExportYuque>;
    jenkins: AutoInstanceType<typeof ExportJenkins>;
  }
}
