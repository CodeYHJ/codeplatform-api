// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/model/auth';
import ExportMicrotask from '../../../app/model/microtask';
import ExportTask from '../../../app/model/task';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Auth: ReturnType<typeof ExportAuth>;
    Microtask: ReturnType<typeof ExportMicrotask>;
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
  }
}
