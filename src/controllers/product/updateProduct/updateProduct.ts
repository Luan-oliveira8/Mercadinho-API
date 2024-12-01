import { Product } from "../../../models/product";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateProductRepository, UpdateProductParams } from "./protocols";

export class UpdateProductController implements IController {
  constructor(private readonly updateProductRepository: IUpdateProductRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateProductParams>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing product id");
      }

      const product = await this.updateProductRepository.updateProduct(id, body);

      return ok<Product>(product);
    } catch (error) {
      return serverError(error);
    }
  }
}
