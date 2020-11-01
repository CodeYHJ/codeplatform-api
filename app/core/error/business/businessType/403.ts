import { BusinessError } from '../businessError';

class Unauthorized extends BusinessError {
  constructor() {
    super();
    this.code = '403';
    this.message = '没有权限';
  }
}

export default Unauthorized;
