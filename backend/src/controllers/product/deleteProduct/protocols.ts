import { Product } from "../../../models/product";

export interface IDeleteProductRepository {
  deleteProduct(id: string): Promise<Product>;
}
