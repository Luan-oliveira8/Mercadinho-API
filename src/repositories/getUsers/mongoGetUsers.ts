import { IGetUsersRepository } from "../../controllers/getUsers/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser, transformMongoArray } from "../mongoProtocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return transformMongoArray(users);
  }
}
