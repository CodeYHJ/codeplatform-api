import { Service } from 'egg';
import { Op } from 'sequelize';
import { dbError } from '../lib/index';
import { Task } from '../../typings/type/service/task';

export default class UpdateService extends Service {
  /**
   * 时间段模式：找出今天前未完成任务
   */
  public async findTodayEndTime() {
    const { ctx } = this;
    const now = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const result = await ctx.model.Task.findAll({
      where: {
        type: 1,
        complete: 0,
        endtime: {
          // endtime < [timestamp] AND endtime >= [timestamp]
          [Op.lt]: now,
          // [Op.gte]: new Date(now - 24 * 60 * 60 * 1000),
        },
      },
      include: [
        {
          model: ctx.model.Microtask,
          attributes: { exclude: ['update_at', 'create_at'] },
        },
      ],
    }).catch(err => {
      dbError.from(err);
    });

    return result;
  }
  /**
   * 频率模式：找出每天都需要完成的任务
   */
  public async findDaydily() {
    const { ctx } = this;
    const result = await ctx.model.Task.findAll({
      where: {
        type: 2,
        frequency: 1,
        complete: 0,
      },
      include: [
        {
          model: ctx.model.Microtask,
          attributes: { exclude: ['update_at', 'create_at'] },
        },
      ],
    }).catch(err => {
      dbError.from(err);
    });
    return result;
  }
  /**
   * 更新当天任务程序（时间段）
   */
  public async updateDay() {
    const result = await this.findTodayEndTime();
    if (!result.length) return;
    await this.updateList(result);
  }
  /**
   * 更新每天需完成的任务程序（频率）
   */
  public async updateDaily() {
    const result = await this.findDaydily();
    if (!result.length) return;
    await this.updateFrequncyList(result);
  }
  /**
   * 更新周任务程序（频率）
   */
  public async updateWeek() {
    const { ctx } = this;
    const result = (await ctx.model.Task.findAll({
      where: { frequency: 2 },
    })) as Task[];
    if (!result.length) return;
    await this.updateList(result);
  }

  /**
   *
   * @param {UpdateListRequest} list 批量更新任务（时间段）
   */
  public async updateList(list: Task[]) {
    if (!list.length) return;
    const transaction = await this.ctx.model.transaction();
    const taskidList: Task[] = await this.handleTaskComplete(list);
    // 整理出来的taskId——list批量更新
    for (let i = 0; i < taskidList.length; i++) {
      const task = taskidList[i];
      await this.ctx.model.Task.update(
        { complete: task.complete },
        { where: { id: task.id } }
      ).catch(err => {
        console.log(err);
        throw dbError.from(err);
      });
    }
    await transaction.commit();
  }
  /**
   *
   * @param {Task} list 批量更新任务（频率）
   */
  public async updateFrequncyList(list: Task[]) {
    if (!list.length) return;
    const { ctx } = this;
    const transaction = await ctx.model.transaction();
    const result = list;
    // 批量判定是否完成
    const taskidList: Task[] = await this.handleTaskComplete(result);
    // 整理出来的taskId——list批量更新
    for (let i = 0; i < taskidList.length; i++) {
      const task = taskidList[i];
      await this.ctx.model.Task.update(
        { complete: task.complete },
        { where: { id: task.id } }
      ).catch(err => {
        console.log(err);
        throw dbError.from(err);
      });
    }

    // 批量新增
    for (let index = 0; index < result.length; index++) {
      const task = result[index];
      const { microtasks } = task;
      const addData = {
        userid: task.userid,
        name: task.name,
        complete: 0,
        type: task.type,
        frequency: task.frequency,
      };
      const dbResult = await this.ctx.model.Task.create(addData).catch(err => {
        dbError.from(err);
      });
      const newMicroTaskList = await microtasks.map(el => {
        return {
          taskid: dbResult.id,
          dsc: el.dsc,
          complete: 0,
        };
      });
      await this.ctx.model.Microtask.bulkCreate(newMicroTaskList).catch(err => {
        dbError.from(err);
      });
    }

    await transaction.commit();
  }

  /**
   * 情况空任务
   */
  public async cleanEmtyTask() {
    const { ctx } = this;
    const result: Task[] = await ctx.model.Task.findAll({
      where: {
        complete: 0,
      },
      include: [
        {
          model: ctx.model.Microtask,
          attributes: { exclude: ['update_at', 'create_at'] },
        },
      ],
    }).catch(err => {
      dbError.from(err);
    });
    for (let index = 0; index < result.length; index++) {
      const task = result[index];
      if (!task.microtasks.length) {
        await this.service.task.deleteTask({ taskid: task.id });
        // await this.service.task.deleteMicroTaskByTaskId(task.id);
      }
    }
    return result;
  }

  /**
   * 整理任务完成度
   * @param {Task[]} list - 任务
   */
  public async handleTaskComplete(list: Task[]) {
    list.forEach(task => {
      const isComplete = task.microtasks.every(item => item.complete === 1);
      // 完成complete字段为1
      if (isComplete) {
        task.complete = 1;
      } else {
        // 未完成complete字段为3
        task.complete = 3;
      }
    });
    return list;
  }
}
