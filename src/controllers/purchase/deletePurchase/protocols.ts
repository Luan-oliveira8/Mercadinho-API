import { Purchase } from "../../../models/purchase";

export interface IDeletePurchaseRepository {
  deletePurchase(id: string): Promise<Purchase>;
}
