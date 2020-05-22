import { BusinessError } from '../businessError';

class Unauthorized extends BusinessError {
  constructor() {
    super();
    this.code = '401';
    this.message = '没有授权，请登陆';
  }
}

export default Unauthorized;
