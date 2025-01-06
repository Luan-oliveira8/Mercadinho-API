import { Purchase } from "../../../models/purchase";
import { ok, serverError } from "../../../utils/helpers";
import { HttpResponse } from "../../../utils/httpProtocols";
import { IController } from "../../protocols";
import { IGetPurchasesRepository } from "./protocols";

export class GetPurchasesController implements IController {
  constructor(
    private readonly getPurchasesRepository: IGetPurchasesRepository
  ) {}

  async handle(): Promise<HttpResponse<Purchase[] | string>> {
    try {
      const purchases = await this.getPurchasesRepository.getPurchases();

      return ok<Purchase[]>(purchases);
    } catch (error) {
      return serverError(error);
    }
  }
}
