import Base from './base';
class DBErroe extends Base {
  constructor() {
    super({ code: '600', message: '网络故障，请稍后再试' });
  }
  public static from(error: Error) {
    const base = super.from(error);
    base.code = '600';
    base.message = '网络故障，请稍后再试';
    return base;
  }
}
export default DBErroe;
