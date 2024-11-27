import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return {
          statusCode: 400,
          body: "Pease sepecify a body",
        };
      }
      console.log(body);

      const user = await this.createUserRepository.createUser(body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Somethig went wrong.: ${error}`,
      };
    }
  }
}
