namespace API {
  export interface BaseResponse<T = any> {
    code: string;
    msg: string;
    success: string;
    data: T;
  }
}
