import { Purchase } from "../../../models/purchase";
import { badRequest, ok, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse } from "../../../utils/httpProtocols";
import { IController } from "../../protocols";
import { IDeletePurchaseRepository } from "./protocols";

export class DeletePurchaseController implements IController {
  constructor(
    private readonly deletePurchaseRepository: IDeletePurchaseRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Purchase | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing purchase id");
      }

      const product = await this.deletePurchaseRepository.deletePurchase(id);

      return ok<Purchase>(product);
    } catch (error) {
      return serverError(error);
    }
  }
}
