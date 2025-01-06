import { Purchase } from "../../../models/purchase";
import { badRequest, ok, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse } from "../../../utils/httpProtocols";
import { IController } from "../../protocols";
import { IUpdatePurchaseRepository, UpdatePurchaseParams } from "./protocols";

export class UpdatePurchaseController implements IController {
  constructor(
    private readonly updatePurchaseRepository: IUpdatePurchaseRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdatePurchaseParams>
  ): Promise<HttpResponse<Purchase | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing purchase id");
      }

      const product = await this.updatePurchaseRepository.updatePurchase(
        id,
        body
      );

      return ok<Purchase>(product);
    } catch (error) {
      return serverError(error);
    }
  }
}
