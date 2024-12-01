import { CreateProductParams, ICreateProductRepository } from "../../../controllers/product/createProduct/protocols";
  import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
  import { MongoProduct, transformMongoObject } from "../../mongoProtocols";
  
  export class MongoCreateProductRepository implements ICreateProductRepository {
    async createProduct(params: CreateProductParams): Promise<Product> {
      const { insertedId } = await MongoClient.db
        .collection("products")
        .insertOne(params);
  
      const product = await MongoClient.db
        .collection<MongoProduct>("products")
        .findOne({ _id: insertedId });
  
      if (!product) {
        throw new Error("Product not created");
      }
  
      return transformMongoObject(product);
    }
  }
  