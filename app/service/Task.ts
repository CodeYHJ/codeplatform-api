import { Service } from 'egg';
import { dbError } from '../lib/index';

/**
 * Task Service
 */
export default class TaskService extends Service {

  /**
   *
   * @param {name,id} data - 新建任务
   */
  public async createTask(data) {
    const { ctx } = this;
    const { userid, name } = data;
    await ctx.model.Task.create({ userid, name }).catch(err => {
      throw dbError.from(err);
    });
  }

  /**
   *
   * @param {number} userid - 获取当前用户所有任务
   */
  public async getTask({ userid }) {
    const {
      ctx: {
        model: { Task: db, Microtask },
      },
    } = this;
    const result = await db
      .findAll({
        where: { userid },
        order: [
          [ 'id', 'asc' ],
          [ Microtask, 'id', 'asc' ],
        ],
        include: [
          {
            model: Microtask,
            attributes: { exclude: [ 'update_at', 'create_at' ] },
          },
        ],
      })
      .catch(err => {
        throw dbError.from(err);
      });
    return result;
  }
  /**
   *
   * @param {id,name} param0 创建微任务
   */
  public async createMicro({ id, name, userid }) {
    const {
      ctx: {
        model: { Microtask: db },
      },
    } = this;
    const data = {
      taskid: id,
      userid,
      dsc: name,
    };
    await db.create(data).catch(err => {
      throw dbError.from(err);
    });
  }
  /**
   * 获取指定taskid的任务
   * @param {number} taskid - 任务id
   */
  public async getTaskByTaskId({ taskid }) {
    const {
      ctx: {
        model: { Task: db, Microtask },
      },
    } = this;

    try {
      const result = await this.ctx.model.transaction(async t => {
        const task = await db.findOne({
          where: { id: taskid },
          order: [
            [ Microtask, 'id', 'asc' ],
          ],
          include: [
            {
              model: Microtask,
            },
          ],
          transaction: t,
        });
        return task;

        // 如果执行到此行,则表示事务已成功提交,`result`是事务返回的结果
        // `result` 就是从事务回调中返回的结果(在这种情况下为 `user`)
      });
      return result;
    } catch (error) {
      // 如果执行到此,则发生错误.
      // 该事务已由 Sequelize 自动回滚！
      throw dbError.from(error);
    }
  }
  /**
   * 删除对应task
   * @param {number} id  - 任务id
   */
  public async deleteTask({ taskid }) {
    await this.ctx.model.Task.destroy({ where: { id: taskid } }).catch(err => {
      throw dbError.from(err);
    });
    await this.deleteAllMicroTask({ taskid });
  }

  /**
   *
   * @param {taskid} param0 - 删除taskid下的所有微任务
   */
  public async deleteAllMicroTask({ taskid }) {
    await this.ctx.model.Microtask.destroy({ where: { taskid } }).catch(err => {
      throw dbError.from(err);
    });
  }
  /**
   *
   * @param {id，complete} data - 更新微任务状态
   */
  public async upDateMicroTaskStatus(data) {
    await this.ctx.model.Microtask.update(
      { complete: data.complete },
      {
        where: { id: data.id },
      },
    ).catch(error => {
      throw dbError.from(error);
    });
  }
  /**
   *
   * @param {id:number,dsc:string} param0 -更新微任务dsc
   */
  public async upDateMicroTaskDsc({ id, dsc }) {
    await this.ctx.model.Microtask.update(
      { dsc },
      {
        where: { id },
      },
    ).catch(error => {
      throw dbError.from(error);
    });
  }
  /**
   *
   * @param {id:number,dsc:string} param0 -更新微任务优先级
   */
  public async upDateMicroTaskPriority({ id, priority }) {
    await this.ctx.model.Microtask.update(
      { priority },
      {
        where: { id },
      },
    ).catch(error => {
      throw dbError.from(error);
    });
  }
  /**
   *
   * @param {id:number,dsc:string} param0 - 更新微任务优先级
   */
  public async upDateMicroTaskRemark({ id, remark }) {
    await this.ctx.model.Microtask.update(
      { remark },
      {
        where: { id },
      },
    ).catch(error => {
      throw dbError.from(error);
    });
  }

  /**
   *
   * @param param0 - 更新截止时间
   */
  public async upDateDeadTime({ id, endtime = false }) {
    const { ctx } = this;
    await ctx.model.Microtask.update({
      endtime: endtime ? endtime : null,
    },
    { where: { taskid: id } },
    ).catch(error => {
      throw dbError.from(error);
    });
  }

}
