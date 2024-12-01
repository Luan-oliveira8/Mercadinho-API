import { User } from "../../../models/user";
import { badRequest, ok, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse } from "../../../utils/httpProtocols";
import { IController } from "../../protocols";
import { ILoginUserRepository } from "./protocols";

export class LoginUsersController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const email = httpRequest?.params?.email;
      const password = httpRequest?.params?.password;

      if (!email || !password) {
        return badRequest("Missing user email and password");
      }

      const user = await this.loginUserRepository.login(email, password);

      return ok<User>(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
