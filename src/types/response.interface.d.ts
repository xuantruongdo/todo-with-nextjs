export interface IResponse<T> {
  data: T;
  status: number;
}

export interface IResponseDelete {
  status: number;
}