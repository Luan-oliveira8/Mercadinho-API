import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { MongoProduct, transformMongoObject } from "../../mongoProtocols";
import { Product } from "../../../models/product";
import { IUpdateProductRepository, UpdateProductParams } from "../../../controllers/product/updateProduct/protocols";

export class MongoUpdateProductRepository implements IUpdateProductRepository {
  async updateProduct(id: string, params: UpdateProductParams): Promise<Product> {
    await MongoClient.db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not updated");
    }

    return transformMongoObject(product);
  }
}
