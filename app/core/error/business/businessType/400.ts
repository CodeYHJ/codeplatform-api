import { BusinessError } from '../businessError';

class FailRespone extends BusinessError {
  constructor(option?: string) {
    const code = '400';
    const message = option || '网络故障请稍后再试';
    super({ code, message });
  }
}

export default FailRespone;
