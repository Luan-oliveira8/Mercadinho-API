import { Product } from "../../../models/product";
import { badRequest, ok, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse, IController } from "../../../utils/httpProtocols";
import { IDeleteProductRepository } from "./protocols";

export class DeleteProductController implements IController {
  constructor(private readonly deleteProductRepository: IDeleteProductRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing product id");
      }

      const product = await this.deleteProductRepository.deleteProduct(id);

      return ok<Product>(product);
    } catch (error) {
      return serverError(error);
    }
  }
}
