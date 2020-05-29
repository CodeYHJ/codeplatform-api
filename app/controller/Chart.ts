import { S200 } from '../lib/index';
import { Controller } from 'egg';

export default class ChartController extends Controller {
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
  /// //
  public async getTasksNum() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const result = await service.chart.getTasksNum({ userid });
    ctx.body = new S200({ result });
  }
  public async getTrend() {
    const { ctx, service } = this;
    const { id: userid } = await ctx.getIdByRedis();
    const result = await service.chart.getTrend({ userid });
    ctx.body = new S200({ result });
  }
}
