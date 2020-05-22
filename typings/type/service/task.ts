import { PromiseCb } from '..';

export enum FrequencyEnum {
  Dayliy = 1,
  Weekliy,
}
enum SelectType {
  Date = 1,
  Frequency,
}

enum Complete {
  UnComplete = 0,
  Complete = 1,
}
export interface Micro {
  id: number;
  dsc: string;
  userid: number;
  taskid: number;
  complete: number;
  create_at: Date;
  update_at: Date;
  remark?: string;
  priority: number;
  starttime?: Date;
  endtime?: Date;
}
export interface Task {
  id: number;
  userid: number;
  name: string;
  type: SelectType;
  frequency: FrequencyEnum;
  complete: Complete;
  microtasks: Micro[];
  starttime: string | null;
  endtime: string | null;
}
interface AddTaskRequest {
  userid: number;
  name: string;
  type: SelectType;
  complete: Complete;
  starttime: string;
  endtime: string;
}
export interface UpdateTaskControllerRequest {
  id: number;
  userid: number;
  name: string;
  type: SelectType;
  complete: Complete;
  microtasks: Micro[];
  frequency?: FrequencyEnum;
  starttime?: string;
  endtime?: string;
}

interface AddTaskCustomizeRequest {
  userid: number;
  name: string;
  type: SelectType;
  complete: Complete;
  frequency: FrequencyEnum;
}
export type AddMicroTaskModel = Micro[];

/// ///
interface BaseData {
  id?: number;
  userid?: number;
  name?: string;
}
interface BaseResponse {
  id: number;
  userid: number;
  name: string;
  type: SelectType;
  frequency: FrequencyEnum;
  complete: Complete;
  microtasks: Micro[];
  starttime: string | null;
  endtime: string | null;
}

interface CreateTask extends BaseData { }

interface GetTask extends BaseData { }
interface GetTaskResponse extends BaseResponse { }

interface CreateMicro {
  id: number;
  name: string;
  userid: number;
}

interface GetTaskByTaskId extends BaseData { }

interface DeleteTask {
  taskid: number;
}

interface DeleteAllMicroTask {
  taskid: number;
}
interface UpDateMicroTaskStatus {
  id: number;
  complete: 1 | 0;
}
interface UpDateMicroTaskDsc {
  id: number;
  dsc: string;
}
interface UpDateMicroTaskPriority {
  id: number;
  priority: number;
}
interface UpDateMicroTaskRemark {
  id: number;
  remark: number;
}
interface GetTasksNum {
  userid: number;
}

interface PriorityNum {
  total: number;
  complete: number;
}
interface PriorityNums {
  general: PriorityNum;
  ordinary: PriorityNum;
  warn: PriorityNum;
  danger: PriorityNum;
}
interface GetTasksNumMicro {
  complete: number;
  priority: number;
  create_at: Date;
}
interface GetTasksNumResult {
  priorityNums: PriorityNums;
  microList: GetTasksNumMicro[];
}

interface UpDateDeadTime {
  id: number;
  endTime?: Date;
}
export abstract class TaskService {
  public abstract createTask: PromiseCb<CreateTask, void>;
  public abstract getTask: PromiseCb<GetTask, GetTaskResponse>;
  public abstract createMicro: PromiseCb<CreateMicro, void>;
  public abstract getTaskByTaskId: PromiseCb<GetTaskByTaskId, Task>;
  public abstract deleteTask: PromiseCb<DeleteTask, void>;
  public abstract deleteAllMicroTask: PromiseCb<DeleteAllMicroTask, void>;
  public abstract upDateMicroTaskStatus: PromiseCb<UpDateMicroTaskStatus, void>;
  public abstract upDateMicroTaskDsc: PromiseCb<UpDateMicroTaskDsc, void>;
  public abstract upDateMicroTaskPriority: PromiseCb<UpDateMicroTaskPriority, void>;
  public abstract upDateMicroTaskRemark: PromiseCb<UpDateMicroTaskRemark, void>;
  public abstract getTasksNum: PromiseCb<GetTasksNum, GetTasksNumResult>;
  public abstract upDateDeadTime: PromiseCb<UpDateDeadTime, void>;


  /// //
  public abstract addTask: PromiseCb<AddTaskRequest, Task>;
  public abstract updateTaskController: PromiseCb<
  UpdateTaskControllerRequest,
  boolean
  >;
  public abstract addTaskByCustomize: PromiseCb<AddTaskCustomizeRequest, Task>;
  public abstract updateTask: PromiseCb<UpdateTaskControllerRequest, boolean>;
  public abstract addMicroTaskList: PromiseCb<Micro[], void>;
  public abstract upDateMicroTask: PromiseCb<Micro, void>;
  public abstract deleteMicroTask: PromiseCb<number, void>;
  public abstract deleteMicroTaskByTaskId: PromiseCb<number, void>;
}
