import { User } from "../../../models/user";
import { badRequest, created, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse, IController } from "../../../utils/httpProtocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return badRequest("Pease sepecify a body");
      }

      const user = await this.createUserRepository.createUser(body);

      return created<User>(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
