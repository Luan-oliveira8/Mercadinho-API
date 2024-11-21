import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  getUsersRepository: IGetUsersRepository;

  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 200,
        body: `Ocorreu um erro inesperado: ${error}`,
      };
    }
  }
}
