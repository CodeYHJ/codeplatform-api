class DBErroe extends Error {
  public code: string;
  public message: string;
  public stack: string;
  constructor() {
    super();
    this.code = '600';
  }
  public static from(error: Error) {
    const dbErroe = new DBErroe();
    dbErroe.stack = error.stack as string;
    dbErroe.message = error.message;
    for (const key of Object.keys(error)) {
      dbErroe[key] = error[key];
    }
    return dbErroe;

  }
}
export default DBErroe;
