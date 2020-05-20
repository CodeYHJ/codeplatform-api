// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFilter from '../../../app/middleware/filter';
import ExportInterceptErr from '../../../app/middleware/interceptErr';

declare module 'egg' {
  interface IMiddleware {
    filter: typeof ExportFilter;
    interceptErr: typeof ExportInterceptErr;
  }
}
