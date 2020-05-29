import Base from '../base';

class SucessResponse extends Base {
  constructor(data?: Record<string, any>) {
    super();
    this.code = '200';
    data && (this.data = data);
  }
}
export default SucessResponse;
