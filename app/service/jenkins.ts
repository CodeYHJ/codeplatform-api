import { Service } from 'egg';
import ServiceError from '../core/error/service/serviceError';
export default class JenkinsService extends Service {
  /**
   *
   * @param {string} path - 请求路径
   */
  private async request(path = '') {
    const { ctx, config } = this;
    const localIP = '172.17.0.1';
    const port = '8081';
    const url = localIP + ':' + port + path;
    const reuslt = await ctx
      .curl(url, {
        auth: `${config.jenkinsId}:${config.jenkinsToken}`,
      })
      .catch(err => {
        throw ServiceError.from(err);
      });

    const {
      res: { data },
    } = reuslt;

    try {
      return JSON.parse(data);
    } catch (error) {
      throw ServiceError.from(error);
    }
  }
  /**
   * 获取所有Test任务
   */
  public async getAllTest() {
    const result = await this.request('/api/json');
    const { jobs } = result;
    const notWorkingColor = ['blue', 'notbuilt'];
    const handleJobs = jobs.map(el => {
      const { name, url, color } = el;
      return {
        name,
        url,
        working: !notWorkingColor.includes(color),
      };
    });
    return handleJobs;
  }

  /**
   *
   * 获取特定test详情
   * @param {string} testName - 对应的测试name
   */
  public async getTestDsc(testName) {
    const path = `/job/${testName}/api/json?tree=builds[building,fullDisplayName,id,queueId,result]`;
    const result = await this.request(path);
    const { builds } = result;
    return builds;
  }
}
