import Base from '../base';

class SucessResponse extends Base {
  constructor(options) {
    super(options);
    this.code = '200';
    delete this.options;
  }
}
export default SucessResponse;
