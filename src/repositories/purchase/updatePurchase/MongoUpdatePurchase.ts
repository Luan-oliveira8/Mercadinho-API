import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { MongoPurchase, transformMongoObject } from "../../mongoProtocols";
import { Purchase } from "../../../models/purchase";
import {
  IUpdatePurchaseRepository,
  UpdatePurchaseParams,
} from "../../../controllers/purchase/updatePurchase/protocols";

export class MongoUpdatePurchaseRepository
  implements IUpdatePurchaseRepository
{
  async updatePurchase(
    id: string,
    params: UpdatePurchaseParams
  ): Promise<Purchase> {
    await MongoClient.db.collection("purchases").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const product = await MongoClient.db
      .collection<MongoPurchase>("purchases")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Purchase not updated");
    }

    return transformMongoObject(product);
  }
}
