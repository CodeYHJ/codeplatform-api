import { Subscription } from 'egg';

class UpdateTask extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 0 * * *', //
      type: 'all', // 指定所有的 worker 都需要执行
      cronOptions: { tz: 'Asia/Shanghai' },
      env: [ 'prod', 'pretst' ],
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // console.log('定时cleanEmtyTask()开始');
    // await this.ctx.service.update.cleanEmtyTask();
    // console.log('定时cleanEmtyTask()结束');
    // console.log('定时updateDay()开始');
    // await this.ctx.service.update.updateDay();
    // console.log('定时updateDay()结束');
    // console.log('定时updateDaily()开始');
    // await this.ctx.service.update.updateDaily();
    // console.log('定时updateDaily()结束');
  }
}

module.exports = UpdateTask;
