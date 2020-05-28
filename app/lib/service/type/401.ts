import Base from '../base';


class Unauthorized extends Base {
  constructor() {
    super();
    this.code = '401';
    this.message = '没有授权，请登陆';
  }
}

export default Unauthorized;
