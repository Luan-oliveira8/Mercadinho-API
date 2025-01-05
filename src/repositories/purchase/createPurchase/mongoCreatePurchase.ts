import { MongoClient } from "../../../database/mongo";
import { MongoPurchase, transformMongoObject } from "../../mongoProtocols";
import { Purchase } from "../../../models/purchase";
import {
  CreatePurchaseParams,
  ICreatePurchaseRepository,
} from "../../../controllers/purchase/createPurchase/protocols";

export class MongoCreatePurchaseRepository
  implements ICreatePurchaseRepository
{
  async createPurchase(params: CreatePurchaseParams): Promise<Purchase> {
    const { insertedId } = await MongoClient.db
      .collection("purchases")
      .insertOne(params);

    const purchase = await MongoClient.db
      .collection<MongoPurchase>("purchases")
      .findOne({ _id: insertedId });

    if (!purchase) {
      throw new Error("Purchase not created");
    }

    return transformMongoObject(purchase);
  }
}
