import ErrOptions from './errOptions';

class BaseError<T extends ErrOptions> extends Error {
  [key: string]: any;
  public code: string;
  public message: string;
  protected options: T;
  constructor(options?: T) {
    super();
    this.options = options || ({} as T);
    this.message = this.options.message || '';
    this.code = this.options.code || '';
  }
}
export default BaseError;
