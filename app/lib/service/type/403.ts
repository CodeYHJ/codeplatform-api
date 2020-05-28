import Base from '../base';

class Unauthorized extends Base {
  constructor() {
    super();
    this.code = '403';
    this.message = '没有权限';
  }
}

export default Unauthorized;
