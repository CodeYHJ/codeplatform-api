import { PromiseCbNoPara, PromiseCb } from '..';
import { Task, Micro } from './task';

export interface UpdateListRequest {
  id: number;
  complete: number;
  microtasks: Micro[];
}
export abstract class UpdateService {
  public abstract updateDay: PromiseCbNoPara<void>;
  public abstract findTodayEndTime: PromiseCbNoPara<Task>;
  public abstract updateWeek: PromiseCbNoPara<void>;
  public abstract updateList: PromiseCb<Task[], void>;
  public abstract updateFrequncyList: PromiseCb<Task[], void>;
  public abstract cleanEmtyTask: PromiseCbNoPara<Task>;
  public abstract handleTaskComplete: PromiseCb<Task[], void>;
  public abstract findDaydily: PromiseCbNoPara<void>;
  public abstract updateDaily: PromiseCbNoPara<void>;
}
