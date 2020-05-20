import { Service } from 'egg';
import ServiceError from '../core/error/service/serviceError';
import { E400 } from '../core/error';

/**
 * Task Service
 */
export default class TaskService extends Service {
  // /**
  //  * 获取单个任务
  //  * @param {number} taskid - 任务id
  //  */
  // public async getTask(taskid) {
  //   const {
  //     ctx: {
  //       model: { Task: db, Microtask },
  //     },
  //   } = this;
  //   const task = await db
  //     .findOne({
  //       taw: true,
  //       attributes: { exclude: [ 'userid', 'update_at' ] },
  //       where: { id: taskid },
  //       include: [
  //         {
  //           model: Microtask,
  //           attributes: { exclude: [ 'update_at', 'create_at' ] },
  //         },
  //       ],
  //     })
  //     .catch(err => {
  //       throw ServiceError.from(err);
  //     });
  //   return task;
  // }

  /**
   * 默认添加任务
   * @param {object} data - 任务信息
   */
  public async addTask(data) {
    const [ dbResult, isCreate ] = await this.ctx.model.Task.findOrCreate({
      where: { userid: data.userid, name: data.name, complete: 0 },
      defaults: data,
    })
      .spread((task, created) => {
        return [ task ? task.get({ plain: true }) : null, created ];
      })
      .catch(err => {
        throw ServiceError.from(err);
      });
    if (isCreate) {
      return this.ctx.helper.extendByFilter(dbResult, []);
    }
    throw new E400('未完成的任务中已存在相同的名字');
  }
  /**
   *
   * @param {object} data 添加自定义任务
   */
  public async addTaskByCustomize(data) {
    const result = await this.ctx.model.Task.create(data).catch(err => {
      ServiceError.from(err);
    });
    return result;
  }

  /**
   *  修改任务
   * @param {object} data - 任务
   */
  public async updateTaskController(data) {
    const {
      ctx: { model },
    } = this;
    const { microtasks = [] } = data;
    delete data.microtasks;
    const transaction = await model.transaction();

    try {
      await this.updateTask(data);
      if (microtasks.length) {
        // 数据库对应taskid下的所有数据
        const dbTask = await this.getTask(data.id);
        // dbTask下的微任务数据
        const { microtasks: dbMicrotasks } = dbTask;
        // 筛选需要新增的微任务
        const addList = microtasks.filter(el => !el.id);
        // 筛选出需要修改的微任务
        const listNoContainAddList = microtasks.filter(el => !!el.id);
        if (dbMicrotasks) {
          // 过滤出需要删除的微任务
          const deleteList = dbMicrotasks.filter(
            el => !listNoContainAddList.every(elList => elList === el.id),
          );
          // 删除微任务
          deleteList.forEach(async el => await this.deleteMicroTask(el.id));
        }
        // 新增与修改微任务c
        const newMicroList = [ ...listNoContainAddList, ...addList ];
        await this.addMicroTaskList(newMicroList);
      }
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw ServiceError.from(err);
    }
  }
  /**
   * 修改对应task
   * @param {id:number,name:string} data  - 修改任务的参数
   */
  public async updateTask(data) {
    const { type } = data;
    if (type === 1) {
      delete data.frequency;
    }
    if (type === 2) {
      delete data.starttime;
      delete data.endtime;
    }
    const {
      ctx: {
        model: { Task: db },
      },
    } = this;

    const dbResult = await db
      .update(data, { where: { id: data.id } })
      .catch(err => {
        throw ServiceError.from(err);
      });
    if (dbResult && dbResult[0] === 1) {
      return true;
    }
    return false;
  }

  /**
   *  新建 or 更新 microtaskList
   * @param  {id:number,taskid:number,dsc:string} data - 新建 or 更新 microtaskList
   */
  public async addMicroTaskList(data) {
    const dbResult = await this.ctx.model.Microtask.bulkCreate(data, {
      updateOnDuplicate: [ 'taskid', 'dsc', 'complete' ],
    }).catch(err => {
      throw ServiceError.from(err);
    });
    return dbResult;
  }

  /**
   * 删除微任务 by microTask id
   * @param {number} id  - 微任务id
   */
  public async deleteMicroTask(id) {
    await this.ctx.model.Microtask.destroy({ where: { id } }).catch(err => {
      throw ServiceError.from(err);
    });
  }
  /**
   * 删除微任务 by task id
   * @param {number} taskid - 用户id
   */
  public async deleteMicroTaskByTaskId(taskid) {
    await this.ctx.model.Microtask.destroy({ where: { taskid } }).catch(err => {
      throw ServiceError.from(err);
    });
  }
  /**
   * 关闭任务
   * @param {id:number,complete:number} data - 任务
   */
  public async closeTask(data) {
    await this.ctx.model.Task.update(
      { complete: data.complete },
      { where: { id: data.id } },
    ).catch(err => {
      throw ServiceError.from(err);
    });
  }

  /// /////////////////////////////////////////////

  /**
   *
   * @param {name,id} data - 新建任务
   */
  public async createTask(data) {
    const { ctx } = this;
    const { userid, name } = data;
    await ctx.model.Task.create({ userid, name }).catch(err => {
      throw ServiceError.from(err);
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
        throw ServiceError.from(err);
      });
    return result;
  }
  /**
   *
   * @param {id,name} param0 创建微任务
   */
  public async createMicro({ id, name }) {
    const {
      ctx: {
        model: { Microtask: db },
      },
    } = this;
    const data = {
      taskid: id,
      dsc: name,
    };
    await db.create(data).catch(err => {
      throw ServiceError.from(err);
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
      throw ServiceError.from(error);
    }
  }
  /**
   * 删除对应task
   * @param {number} id  - 任务id
   */
  public async deleteTask({ taskid }) {
    await this.ctx.model.Task.destroy({ where: { id: taskid } }).catch(err => {
      throw ServiceError.from(err);
    });
    await this.deleteAllMicroTask({ taskid });
  }

  /**
   *
   * @param {taskid} param0 - 删除taskid下的所有微任务
   */
  public async deleteAllMicroTask({ taskid }) {
    await this.ctx.model.Microtask.destroy({ where: { taskid } }).catch(err => {
      throw ServiceError.from(err);
    });
  }
  /**
   * 更新微任务状态
   * @param {id，complete} data - 微任务
   */
  public async upDateMicroTaskStatus(data) {
    await this.ctx.model.Microtask.update(
      { complete: data.complete },
      {
        where: { id: data.id },
      },
    ).catch(error => {
      throw ServiceError.from(error);
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
      throw ServiceError.from(error);
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
      throw ServiceError.from(error);
    });
  }
  /**
   *
   * @param {id:number,dsc:string} param0 -更新微任务优先级
   */
  public async upDateMicroTaskRemark({ id, remark }) {
    await this.ctx.model.Microtask.update(
      { remark },
      {
        where: { id },
      },
    ).catch(error => {
      throw ServiceError.from(error);
    });
  }
}
