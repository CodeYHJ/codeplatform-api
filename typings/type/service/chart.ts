import { PromiseCb } from '..';

export interface TaskNumTodayResponse {
  totalNum: number;
  completedNum: number;
  failNum: number;
}
export interface TaskNumInMounth {
  name: string;
  day: string;
  num: number;
}
type TaskNumInMounthResponse = TaskNumInMounth[];

interface GetTasksNum {
  userid: number;
}
interface GetTasksNumResult {
  total: number;
  complete: number;
}
interface GetTasksNumResultList {
  general: GetTasksNumResult;
  ordinary: GetTasksNumResult;
  warn: GetTasksNumResult;
  danger: GetTasksNumResult;
}

interface GetTrend extends GetTasksNum { }
export abstract class ChartService {
  public abstract getTaskNumToday: PromiseCb<number, TaskNumTodayResponse>;
  public abstract getTasksNumInWeek: PromiseCb<number, TaskNumTodayResponse>;
  public abstract getTaskNumInMounth: PromiseCb<number, TaskNumInMounthResponse>;
  public abstract getTrend: PromiseCb<GetTrend, GetTasksNumResult>;

  /// /////
  public abstract getTasksNum: PromiseCb<GetTasksNum, GetTasksNumResultList>;
}
