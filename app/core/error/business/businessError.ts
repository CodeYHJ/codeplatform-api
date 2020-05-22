import { BusinessErrorOptions } from './businessErrorOptions';
import BaseError from '../baseError';

export class BusinessError extends BaseError<BusinessErrorOptions> {
  public data?: object;
  protected options: BusinessErrorOptions;

  constructor(options?: BusinessErrorOptions) {
    super(options);
    this.data = this.options.data;
  }
}
