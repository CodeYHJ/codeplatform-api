import { PromiseCb } from '..';

export interface TaskNumTodayResponse{
  totalNum: number;
  completedNum: number;
  failNum: number;
}
export interface TaskNumInMounth{
  name: string;
  day: string;
  num: number;
}
type TaskNumInMounthResponse = TaskNumInMounth[]

export abstract class ChartService {
  public abstract getTaskNumToday: PromiseCb<number, TaskNumTodayResponse>;
  public abstract getTasksNumInWeek: PromiseCb<number, TaskNumTodayResponse>;
  public abstract getTaskNumInMounth: PromiseCb<number, TaskNumInMounthResponse>;
}

