import { HttpRequest, HttpResponse } from "../utils/httpProtocols";

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
  }