import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { MongoPurchase, transformMongoObject } from "../../mongoProtocols";
import { Purchase } from "../../../models/purchase";
import { IDeletePurchaseRepository } from "../../../controllers/purchase/deletePurchase/protocols";

export class MongoDeletePurchaseRepository
  implements IDeletePurchaseRepository
{
  async deletePurchase(id: string): Promise<Purchase> {
    const product = await MongoClient.db
      .collection<MongoPurchase>("purchases")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Purchase not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("purchases")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Product not deleted");
    }

    return transformMongoObject(product);
  }
}
