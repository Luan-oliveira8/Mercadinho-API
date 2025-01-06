import { Product } from "../../../models/product";
import { Purchase } from "../../../models/purchase";

export interface UpdatePurchaseParams {
  totalAmount: number;
  amountReturn: number;
  paidAmount: number;
  data: Product[];
}

export interface IUpdatePurchaseRepository {
  updatePurchase(id: string, params: UpdatePurchaseParams): Promise<Purchase>;
}
