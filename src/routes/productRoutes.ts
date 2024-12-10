import { Router } from "express";
import { CreateProductController } from "../controllers/product/createProduct/createProduct";
import { DeleteProductController } from "../controllers/product/deleteProduct/deleteProduct";
import { GetProductsController } from "../controllers/product/getProducts/getProducts";
import { UpdateProductController } from "../controllers/product/updateProduct/updateProduct";
import { MongoCreateProductRepository } from "../repositories/product/createProduct/mongoCreateProduct";
import { MongoDeleteProductRepository } from "../repositories/product/deleteProduct/mongoDeleteProduct";
import { MongoGetProductsRepository } from "../repositories/product/getProducts/MongoGetProducts";
import { MongoUpdateProductRepository } from "../repositories/product/updateProduct/MongoUpdateProduct";

const productRoutes = Router();

const mongoCreateProductRepository = new MongoCreateProductRepository();
const createProductController = new CreateProductController(
  mongoCreateProductRepository
);

const mongoDeleteProductRepository = new MongoDeleteProductRepository();
const deleteProductController = new DeleteProductController(
  mongoDeleteProductRepository
);

const mongoGetProductsRepository = new MongoGetProductsRepository();
const getProductsController = new GetProductsController(
  mongoGetProductsRepository
);

const mongoUpdateProductRepository = new MongoUpdateProductRepository();
const updateProductController = new UpdateProductController(
  mongoUpdateProductRepository
);

productRoutes.post("/register", async (req, res) => {
  const { body, statusCode } = await createProductController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

productRoutes.delete("/:id", async (req, res) => {
  const { body, statusCode } = await deleteProductController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

productRoutes.get("/", async (req, res) => {
  const { body, statusCode } = await getProductsController.handle();

  res.status(statusCode).send(body);
});

productRoutes.patch("/:id", async (req, res) => {
  const { body, statusCode } = await updateProductController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default productRoutes;
