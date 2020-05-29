
class Base {
  public code: string;
  public data: Record<string, any> | null = null;
  public message: string
  constructor() {
    this.code = '200';
    this.message = '';
  }
}
export default Base;
