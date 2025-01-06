import { Purchase } from "../../../models/purchase";

export interface IGetPurchasesRepository {
  getPurchases(): Promise<Purchase[]>;
}
