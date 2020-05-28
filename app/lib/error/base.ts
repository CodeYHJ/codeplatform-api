interface BaseOptions{
  code?: string;
  message?: string;
  [key: string]: any;
}
class Base extends Error {
  public code='';
  public options: BaseOptions;
  constructor(options?: BaseOptions) {
    super();
    this.options = options || {} as BaseOptions;
  }
  public static from(error: Error) {
    const dbErroe = new Base();
    dbErroe.stack = error.stack as string;
    dbErroe.message = error.message;
    for (const key of Object.keys(error)) {
      dbErroe[key] = error[key];
    }
    return dbErroe;

  }
}
export default Base;
