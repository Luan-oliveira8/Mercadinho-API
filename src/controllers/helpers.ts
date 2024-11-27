import { HttpResponse } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};

export const badRequest = (menssage: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: menssage,
  };
};

export const serverError = (menssage: string): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: menssage,
  };
};
