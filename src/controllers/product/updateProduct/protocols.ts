import { Product } from "../../../models/product";

export interface UpdateProductParams {
  name: string;
  barcode: string;
  selPrice: number;
  quantity: number;
}

export interface IUpdateProductRepository {
  updateProduct(id: string, params: UpdateProductParams): Promise<Product>;
}
