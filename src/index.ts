import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { MongoCreateProductRepository } from "./repositories/product/createProduct/mongoCreateProduct";
import { CreateProductController } from "./controllers/product/createProduct/createProduct";
import { MongoDeleteProductRepository } from "./repositories/product/deleteProduct/mongoDeleteProduct";
import { DeleteProductController } from "./controllers/product/deleteProduct/deleteProduct";
import { MongoGetProductsRepository } from "./repositories/product/getProducts/MongoGetProducts";
import { GetProductsController } from "./controllers/product/getProducts/getProducts";
import { MongoUpdateProductRepository } from "./repositories/product/updateProduct/MongoUpdateProduct";
import { UpdateProductController } from "./controllers/product/updateProduct/updateProduct";
import userRoutes from "./routes/userRoutes";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/", async (req, res) => {
    res.send("Teste");
  });

  app.use("/users", userRoutes);

  app.post("/product", async (req, res) => {
    const mongoCreateProductRepository = new MongoCreateProductRepository();

    const createProductController = new CreateProductController(
      mongoCreateProductRepository
    );
    const { body, statusCode } = await createProductController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/products/:id", async (req, res) => {
    const mongoDeleteProductRepository = new MongoDeleteProductRepository();
    const deleteProductController = new DeleteProductController(
      mongoDeleteProductRepository
    );

    const { body, statusCode } = await deleteProductController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.get("/products", async (req, res) => {
    const mongoGetProductsRepository = new MongoGetProductsRepository();
    const getProductsController = new GetProductsController(mongoGetProductsRepository);

    const { body, statusCode } = await getProductsController.handle();

    res.status(statusCode).send(body);
  });

  app.patch("/product/:id", async (req, res) => {
    const mongoUpdateProductRepository = new MongoUpdateProductRepository();
    const updateProductController = new UpdateProductController(
      mongoUpdateProductRepository
    );

    const { body, statusCode } = await updateProductController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`Rodando na porta ${port}`));
};

main();
