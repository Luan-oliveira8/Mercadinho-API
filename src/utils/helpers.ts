import { HttpResponse, HttpStatusCode } from "./httpProtocols";

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body: body,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body: body,
  };
};

export const badRequest = (menssage: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: menssage,
  };
};

export const serverError = (error: unknown): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: `Something went wrong: ${error}`,
  };
};
