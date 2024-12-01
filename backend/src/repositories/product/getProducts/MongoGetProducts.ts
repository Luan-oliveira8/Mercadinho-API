import { IGetProductsRepository } from "../../../controllers/product/getProducts/protocols";
import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
import { MongoProduct, transformMongoArray } from "../../mongoProtocols";

export class MongoGetProductsRepository implements IGetProductsRepository {
  async getProducts(): Promise<Product[]> {
    const products = await MongoClient.db
      .collection<MongoProduct>("products")
      .find({})
      .toArray();

    return transformMongoArray(products);
  }
}
