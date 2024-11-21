import { IGetUsersRepository } from "../../controllers/getUsers/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        name: "Luan",
        email: "Teste",
        password: "123",
      },
    ];
  }
}
