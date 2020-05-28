
import Base from '../base';

class FailRespone extends Base {
  constructor(message: string) {
    super();
    this.code = '400';
    this.message = message || '网络故障请稍后再试';
  }
}

export default FailRespone;
