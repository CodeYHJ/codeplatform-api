import ErrOptions from '../errOptions';
import BaseError from '../baseError';

class ServiceError<T extends ErrOptions> extends BaseError<T> {
  constructor(options?: T) {
    super(options);
    this.code = '600';
    this.options = options || {} as T;
    this.message = this.options.message || '';
  }
  public static from(err: Error) {
    const newErr = new ServiceError();
    newErr.message = err.message;
    newErr.stack = err.stack;
    for (const key of Object.keys(err)) {
      newErr[key] = err[key];
    }
    return newErr;
  }
}

export default ServiceError;
