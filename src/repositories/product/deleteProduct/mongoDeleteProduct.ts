import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { MongoProduct, transformMongoObject } from "../../mongoProtocols";
import { Product } from "../../../models/product";
import { IDeleteProductRepository } from "../../../controllers/product/deleteProduct/protocols";

export class MongoDeleteProductRepository implements IDeleteProductRepository {
  async deleteProduct(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Product not deleted");
    }

    return transformMongoObject(product);
  }
}
