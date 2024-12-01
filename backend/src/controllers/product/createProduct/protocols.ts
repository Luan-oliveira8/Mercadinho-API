import { Product } from "../../../models/product";

export interface CreateProductParams {
    name: string;
    barcode: string;
    selPrice: number;
}

export interface ICreateProductRepository {
  createProduct(params: CreateProductParams): Promise<Product>;
}
