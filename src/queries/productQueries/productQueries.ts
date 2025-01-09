import { MongoClient } from "../../database/mongo";
import { ObjectId } from "mongodb";
import { Product } from "../../models/product";

export const checkProductsAvailability = async (products: Product[]) => {
  try {
    let totalMatchingProducts = 0;
    for await (const product of products) {
      const condition = {
        _id: new ObjectId(product.id),
        $expr: {
          $gte: [{ $toDouble: "$quantity" }, Number(product.quantity)],
        },
      };

      const count = await MongoClient.db
        .collection("products")
        .countDocuments(condition);

      totalMatchingProducts += count;
    }

    return totalMatchingProducts === products.length;
  } catch (error) {
    console.log(error);
    return false;
  }
};
