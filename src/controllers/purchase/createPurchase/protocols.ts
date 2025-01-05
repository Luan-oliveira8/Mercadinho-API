import { Product } from "../../../models/product";
import { Purchase } from "../../../models/purchase";

export interface CreatePurchaseParams {
  totalAmount?: number;
  amountReturn?: number;
  paidAmount?: number;
  data: Product[];
}

export interface ICreatePurchaseRepository {
  createPurchase(params: CreatePurchaseParams): Promise<Purchase>;
}
