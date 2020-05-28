import { Service } from 'egg';
import { Op } from 'sequelize';
import { dbError } from '../lib/index';

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
      throw dbError.from(err);
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
      throw dbError.from(err);
    });
    const dayResult = [ ...day_type_1_Result, ...day_type_2_Result ];
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
      throw dbError.from(err);
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
  /**
   *
   *
   *
   */

  /**
   *
   * @param {userid} param0 - 获取当月所有类型数量
   */
  public async getTasksNum({ userid }) {
    const { ctx } = this;
    const result = await ctx.model
      .transaction(async t => {
        const dbResult = await ctx.model.Microtask.findAll({
          raw: true,
          where: {
            userid,
          },
          attributes: [
            'priority',
            [
              ctx.model.Sequelize.fn(
                'COUNT',
                ctx.model.Sequelize.col('priority'),
              ),
              'total',
            ],
            [
              ctx.model.Sequelize.fn(
                'SUM',
                ctx.model.Sequelize.col('complete'),
              ),
              'complete',
            ],
          ],
          group: [ 'priority' ],
          transaction: t,
        });
        return dbResult;
      })
      .catch(error => {
        throw dbError.from(error);
      });
    return result;
  }
  public async getTrend({ userid }) {
    const {
      ctx,
      ctx: {
        model: { Sequelize },
      },
    } = this;
    const result = await ctx.model
      .transaction(async t => {
        const dbResult = await ctx.model.Microtask.findAll({
          raw: true,
          where: {
            userid,
            create_at: {
              // createdAt < [timestamp] AND createdAt > [timestamp]
              [Op.lte]: ctx.helper.timeEndInMonth(),
              [Op.gte]: ctx.helper.timeStartInMonth(),
            },
          },
          attributes: [
            'priority',
            [ Sequelize.fn('COUNT', Sequelize.col('priority')), 'total' ],
            [ Sequelize.fn('SUM', Sequelize.col('complete')), 'complete' ],
            [ Sequelize.fn('day', Sequelize.col('create_at')), 'day' ],
          ],

          group: [ 'priority', Sequelize.fn('day', Sequelize.col('create_at')) ],
          transaction: t,
        });
        return dbResult;
      })
      .catch(error => {
        throw dbError.from(error);
      });
    return result;
  }
}
