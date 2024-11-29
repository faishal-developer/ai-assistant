export  type IGenericErrorMessage = {
  path: string | null | number;
  message: string | null;
};

export type IGenericErrorResponse = {
    statusCode:number;
    message:string;
    errorMessages:IGenericErrorMessage[];
}

export type IApiResponse<T>={
  statusCode:number;
  success:boolean;
  message:string | null;
  data?:T | null;
  meta?:{
    page:number;
    limit:number;
    total:number;
  }
}