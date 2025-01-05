import { Purchase } from "../../../models/purchase";
import { badRequest, created, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse } from "../../../utils/httpProtocols";
import { IController } from "../../protocols";
import { CreatePurchaseParams, ICreatePurchaseRepository } from "./protocols";

export class CreatePurchaseController implements IController {
  constructor(
    private readonly createPurchaseRepositor: ICreatePurchaseRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreatePurchaseParams>
  ): Promise<HttpResponse<Purchase | string>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return badRequest("Pease sepecify a body");
      }

      const purchase = await this.createPurchaseRepositor.createPurchase(body);

      return created<Purchase>(purchase);
    } catch (error) {
      return serverError(error);
    }
  }
}
