import { Product } from "./product";

export interface Purchase {
  id: string;
  totalAmount?: number;
  amountReturn?: number;
  paidAmount?: number;
  purchaseReference?: string;
  data: Product[];
}
