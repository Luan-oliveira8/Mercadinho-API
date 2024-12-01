import { Product } from "../../../models/product";
import { badRequest, created, serverError } from "../../../utils/helpers";
import { HttpRequest, HttpResponse } from "../../../utils/httpProtocols";
import { IController } from "../../protocols";
import { CreateProductParams, ICreateProductRepository } from "./protocols";

export class CreateProductController implements IController {
  constructor(private readonly createProductRepository: ICreateProductRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateProductParams>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return badRequest("Pease sepecify a body");
      }

      const product = await this.createProductRepository.createProduct(body);

      return created<Product>(product);
    } catch (error) {
      return serverError(error);
    }
  }
}
