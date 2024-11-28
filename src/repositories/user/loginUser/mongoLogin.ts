import { ILoginUserRepository } from "../../../controllers/user/loginUser/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoUser, transformMongoObject } from "../../mongoProtocols";

export class MongoLoginRepository implements ILoginUserRepository {
  async login(email: string, password: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email, password });

    if (!user) {
      throw new Error("User not found");
    }

    return transformMongoObject(user);
  }
}
