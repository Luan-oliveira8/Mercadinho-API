import { User } from "../../../models/user";
import { ok, serverError } from "../../../utils/helpers";
import { HttpResponse, IController } from "../../../utils/httpProtocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError(error);
    }
  }
}
