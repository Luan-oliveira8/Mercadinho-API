import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { IDeleteUserRepository } from "../../../controllers/user/deleteUser/protocols";
import { MongoUser, transformMongoObject } from "../../mongoProtocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    return transformMongoObject(user);
  }
}
