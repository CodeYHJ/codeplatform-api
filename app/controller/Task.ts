import { Controller } from 'egg';

import { S200 } from '../lib/index';

export default class TaskController extends Controller {

  public async createTask() {
    const { ctx, service } = this;
    const validateRule = {
      name: 'string',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
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
    await ctx.checkValidate(validateRule, ctx.query);

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
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.createMicro({ userid, ...ctx.request.body });
    ctx.body = new S200({ status: true });
  }
  public async deletetask() {
    const { ctx, service } = this;

    const validateRule = {
      taskid: 'number',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
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
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskStatus(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskDsc() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      dsc: 'string',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskDsc(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskPriority() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      priority: 'number',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskPriority(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateMicroTaskRemark() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      remark: 'string',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.upDateMicroTaskRemark(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async upDateDeadTime() {
    const { ctx, service } = this;
    const validateRule = {
      id: 'number',
      endtime: 'string?',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.upDateDeadTime(ctx.request.body);
    ctx.body = new S200({ status: true });
  }
  public async deleteAllMicroTask() {
    const { ctx, service } = this;
    const validateRule = {
      taskid: 'number',
    };
    await ctx.checkValidate(validateRule, ctx.request.body);
    await service.task.deleteAllMicroTask(ctx.request.body);
    ctx.body = new S200({ status: true });
  }


}
