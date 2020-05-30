export interface TaskController {
  createTask: Promise<void>;
  getTask: Promise<void>;
  createMicro: Promise<void>;
  getTaskByTaskId: Promise<void>;
  deletetask: Promise<void>;
  upDateMicroTaskStatus: Promise<void>;
  upDateMicroTaskDsc: Promise<void>;
  upDateMicroTaskPriority: Promise<void>;
  upDateMicroTaskRemark: Promise<void>;
  upDateDeadTime: Promise<void>;
  deleteAllMicroTask: Promise<void>;
  upDateTaskName: Promise<void>;
}
