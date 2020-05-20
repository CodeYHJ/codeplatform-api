import { Service } from 'egg';
import { Op } from 'sequelize';
import ServiceError from '../core/error/service/serviceError';

/**
 * Chart Service
 */
export default class Chart extends Service {
  /**
   * 获取一天的任务数量
   * @param id {number}
   */
  public async getTaskNumToday(id) {
    const { ctx } = this;
    let day: any = null;
    const day_type_1_Result = await ctx.model.Task.findAll({
      where: {
        userid: id,
        type: 1,
        endtime: {
          // createdAt < [timestamp] AND createdAt > [timestamp]
          [Op.lte]: new Date(),
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }).catch(err => {
      throw ServiceError.from(err);
    });
    const day_type_2_Result = await ctx.model.Task.findAll({
      where: {
        userid: id,
        type: 2,
        create_at: {
          // createdAt < [timestamp] AND createdAt > [timestamp]
          [Op.lte]: new Date(),
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }).catch(err => {
      throw ServiceError.from(err);
    });
    const dayResult = [...day_type_1_Result, ...day_type_2_Result];
    if (!dayResult || !dayResult.length) return day;
    day = await ctx.helper.filterTask(dayResult);
    return day;
  }
  /**
   * 获取一周内的任务数据
   * @param id {number}
   */
  public async getTasksNumInWeek(id) {
    const { ctx } = this;
    const now = new Date().getDay();
    let week: any = null;
    // 获取这周的任务
    const weekResult = await ctx.model.Task.findAll({
      where: {
        userid: id,
        create_at: {
          // lte:<=
          // gte:>=
          // createdAt <= [timestamp] AND createdAt > [timestamp]
          [Op.gte]: ctx.helper.leftTimeStartInWeek(now - 1),
          [Op.lte]: ctx.helper.rightTimeEndInWeek(7 - now),
        },
      },
    }).catch(err => {
      throw ServiceError.from(err);
    });
    if (!weekResult || !weekResult.length) return week;
    week = await ctx.helper.filterTask(weekResult);
    return week;
  }
  /**
   * 获取一个月内的任务数据
   * @param id {number}
   */
  public async getTaskNumInMounth(id) {
    const { ctx } = this;
    const month: any = null;
    const monthResult = await ctx.model.Task.findAll({
      raw: true,
      where: {
        userid: id,
        create_at: {
          // createdAt < [timestamp] AND createdAt > [timestamp]
          [Op.lte]: ctx.helper.timeEndInMonth(),
          [Op.gte]: ctx.helper.timeStartInMonth(),
        },
      },
    });
    if (!monthResult || !monthResult.length) return month;
    const days = ctx.helper.getDaysOfMonth();
    const result = await ctx.helper.handleMonthData(monthResult, days);
    return result;
  }
  // private async handleMonthData(list) {
  //   const totalMap = new Map<number, any>();
  //   const completeMap = new Map<number, any>();
  //   const days = this.ctx.helper.getDaysOfMonth();
  //   for (let i = 0; i <= days; i++) {
  //     completeMap.set(i, {
  //       name: 'Complete',
  //       day: `${i}`,
  //       num: 0,
  //     });
  //     totalMap.set(i, {
  //       name: 'Total',
  //       day: `${i}`,
  //       num: 0,
  //     });
  //   }
  //   // 存在的任务整理
  //   list.forEach(el => {
  //     const createTime = el.create_at;
  //     const transFormDay = new Date(createTime).getDate();
  //     if (el.complete === 1) {
  //       const targetComplete = completeMap.get(transFormDay);
  //       targetComplete.num = targetComplete.num += 1;
  //       completeMap.set(transFormDay, targetComplete);
  //     }
  //     const targetTotal = totalMap.get(transFormDay);
  //     targetTotal.num = targetTotal.num += 1;
  //     totalMap.set(transFormDay, targetTotal);
  //   });
  //   const resultList: any[] = [];
  //   // 整理数据结构
  //   for (const value of completeMap.values()) {
  //     resultList.push(value);
  //   }
  //   for (const value of totalMap.values()) {
  //     resultList.push(value);
  //   }
  //   return resultList;
  // }
  // private async filterTask(list) {
  //   const completedNum = list.filter(el => el.complete === 1).length;
  //   const totalNum = list.length;
  //   const failNum = totalNum - completedNum;
  //   return { totalNum, completedNum, failNum };
  // }
}