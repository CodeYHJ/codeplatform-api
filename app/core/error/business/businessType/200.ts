class SuccessRespone {
  public code: string;
  public message: string;
  public data: Record<string, any>;

  constructor(responeData?: Record<string, any>) {
    this.code = '200';
    this.message = 'SUCCESS';
    this.data = responeData || [];
  }
}

export default SuccessRespone;
