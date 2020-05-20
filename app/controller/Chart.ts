import BaseController from './base';
import { S200 } from '../core/error';

export default class ChartController extends BaseController {
  public async getTaskNumToday() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const dbTaskResult = await service.chart.getTaskNumToday(userid);
    ctx.body = new S200({ tasksNum: dbTaskResult });
  }
  public async getTaskNumInWeek() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const dbTaskResult = await service.chart.getTasksNumInWeek(userid);
    ctx.body = new S200({ tasksNum: dbTaskResult });
  }
  public async getTaskNumInMonth() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const result = await service.chart.getTaskNumInMounth(userid);
    ctx.body = new S200({ tasksList: result });
  }
}
