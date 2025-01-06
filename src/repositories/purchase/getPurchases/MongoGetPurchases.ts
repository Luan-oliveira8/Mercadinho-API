import { IGetPurchasesRepository } from "../../../controllers/purchase/getPurchase/protocols";
import { MongoClient } from "../../../database/mongo";
import { Purchase } from "../../../models/purchase";
import { MongoPurchase, transformMongoArray } from "../../mongoProtocols";

export class MongoGetPurchasesRepository implements IGetPurchasesRepository {
  async getPurchases(): Promise<Purchase[]> {
    const purchases = await MongoClient.db
      .collection<MongoPurchase>("purchases")
      .find({})
      .toArray();

    return transformMongoArray(purchases);
  }
}
