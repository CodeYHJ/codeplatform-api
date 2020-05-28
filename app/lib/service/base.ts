interface BaseOptions {
  data?: Record<string, any> | null;
  [key: string]: any;
}
class Base {
  public code: string;
  public options: BaseOptions;
  public data: Record<string, any> | null
  public message: string
  constructor(options?: BaseOptions) {
    this.code = '200';
    this.options = options || {};
    this.data = this.options.data || null;
    this.message = this.options.message || '';
  }
}
export default Base;
