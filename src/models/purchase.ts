import { Product } from "./product";

export interface Purchase {
  id: string;
  totalAmount?: number;
  amountReturn?: number;
  paidAmount?: number;
  data: Product[];
}
