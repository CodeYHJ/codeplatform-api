import BaseController from './base';
import { S200 } from '../core/error';

interface AddTaskRequest {
  name: string;
  starttime: string;
  endtime: string;
  userid: number;
  complete: number;
  type: number;
}
export default class TaskController extends BaseController {
  // public async index() {
  //   const { ctx, service } = this;
  //   const { id: userid } = await ctx.getIdByRedis();
  //   const dbTaskResult = await service.task.getTaskById(userid);
  //   ctx.body = new S200({ taskList: dbTaskResult });
  // }

  public async addtask() {
    const { ctx, service } = this;

    const validateRule = {
      name: 'string',
      type: 'number',
      starttime: 'string',
      endtime: 'string',
    };
    await this.check(validateRule, ctx.request.body);

    const { id: userid } = await ctx.getIdByRedis();

    const { name, type, starttime, endtime, complete = 0 } = ctx.request.body;

    const setData = {
      userid,
      name,
      starttime,
      endtime,
      complete,
      type,
    } as AddTaskRequest;

    const result = await service.task.addTask(setData);

    ctx.body = new S200({ task: result });
  }

  public async updatetask() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      name: 'string',
      complete: { type: 'number', min: 0, max: 1 },
      frequency: { type: 'number?', min: 0, max: 3 },
      type: { type: 'number', min: 1, max: 2 },
      starttime: 'string?',
      endtime: 'string?',
      microtasks: {
        type: 'array',
        itemType: 'object',
        rule: {
          taskid: 'number',
          dsc: 'string',
          id: 'number?',
          complete: { type: 'number', min: 0, max: 1 },
        },
      },
    };
    await this.check(validateRule, ctx.request.body);

    const result = await service.task.updateTaskController(ctx.request.body);

    ctx.body = new S200({ status: result });
  }

  public async deletemicrotask() {
    const { ctx, service } = this;

    const validateRule = {
      microtaskid: 'number',
    };
    await this.check(validateRule, ctx.request.body);

    const { microtaskid } = ctx.request.body;
    await service.task.deleteMicroTask(microtaskid);
    ctx.body = new S200({ status: true });
  }

  /// //////////
  public async createTask() {
    const { ctx, service } = this;
    const validateRule = {
      name: 'string',
    };
    await this.check(validateRule, ctx.request.body);
    const { id: userid } = await ctx.getIdByRedis();
    const { name } = ctx.request.body;
    await service.task.createTask({ userid, name });
    ctx.body = new S200({ status: true });
  }
  public async getTask() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const result = await service.task.getTask({ userid });
    ctx.body = new S200({ taskList: result });
  }
  public async getTaskByTaskId() {
    const { ctx, service } = this;
    const validateRule = {
      taskid: 'number',
    };
    await this.check(validateRule, ctx.query);

    const result = await service.task.getTaskByTaskId(ctx.query);
    ctx.body = new S200({ task: result });
  }
  public async createMicro() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      name: 'string',
    };
    const { id: userid } = await ctx.getIdByRedis();
    await this.check(validateRule, ctx.request.body);
    await service.task.createMicro({ userid, ...ctx.request.body });
    ctx.body = new S200({ status: true });
  }
  public async deletetask() {
    const { ctx, service } = this;

    const validateRule = {
      taskid: 'number',
    };
    await this.check(validateRule, ctx.request.body);
    const { taskid } = ctx.request.body;
    await service.task.deleteTask({ taskid });
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskStatus() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      complete: { type: 'number', min: 0, max: 1 },
    };
    await this.check(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskStatus(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskDsc() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      dsc: 'string',
    };
    await this.check(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskDsc(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskPriority() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      priority: 'number',
    };
    await this.check(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskPriority(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskRemark() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      remark: 'string',
    };
    await this.check(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskRemark(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateDeadTime() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      endtime: 'string?',
    };
    await this.check(validateRule, ctx.request.body);
    await service.task.upDateDeadTime(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async deleteAllMicroTask() {
    const { ctx, service } = this;
    const validateRule = {
      taskid: 'number',
    };
    await this.check(validateRule, ctx.request.body);
    await service.task.deleteAllMicroTask(ctx.request.body);
    ctx.body = new S200({ status: true });
  }


}
