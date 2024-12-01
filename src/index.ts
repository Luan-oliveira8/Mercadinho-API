import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/user/getUsers/getUsers";
import { MongoGetUsersRepository } from "./repositories/user/getUsers/mongoGetUsers";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/user/creaateUser/mongoCreateUser";
import { CreateUserController } from "./controllers/user/createUser/createUser";
import { UpdateUserController } from "./controllers/user/updateUser/updateUser";
import { MongoUpdateUserRepository } from "./repositories/user/updateUser/mongoUpdateUser";
import { MongoDeleteUserRepository } from "./repositories/user/deleteUser/mongoDeleteUser";
import { DeleteUserController } from "./controllers/user/deleteUser/deleteUser";
import { MongoLoginRepository } from "./repositories/user/loginUser/mongoLogin";
import { LoginUsersController } from "./controllers/user/loginUser/loginUser";
import { MongoCreateProductRepository } from "./repositories/product/createProduct/mongoCreateProduct";
import { CreateProductController } from "./controllers/product/createProduct/createProduct";
import { MongoDeleteProductRepository } from "./repositories/product/deleteProduct/mongoDeleteProduct";
import { DeleteProductController } from "./controllers/product/deleteProduct/deleteProduct";
import { MongoGetProductsRepository } from "./repositories/product/getProducts/MongoGetProducts";
import { GetProductsController } from "./controllers/product/getProducts/getProducts";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/", async (req, res) => {
    res.send("Teste");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );
    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.post("/login", async (req, res) => {
    const mongoLoginRepository = new MongoLoginRepository();
    const loginUsersController = new LoginUsersController(mongoLoginRepository);

    const { body, statusCode } = await loginUsersController.handle({
      params: req.body,
    });

    res.status(statusCode).send(body);
  });

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

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`Rodando na porta ${port}`));
};

main();
