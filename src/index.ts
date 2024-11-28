import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/creaateUser/mongoCreateUser";
import { CreateUserController } from "./controllers/createUser/createUser";
import { UpdateUserController } from "./controllers/updateUser/updateUser";
import { MongoUpdateUserRepository } from "./repositories/updateUser/mongoUpdateUser";
import { MongoDeleteUserRepository } from "./repositories/deleteUser/mongoDeleteUser";
import { DeleteUserController } from "./controllers/deleteUser/deleteUser";
import { MongoLoginRepository } from "./repositories/loginUser/mongoLogin";
import { LoginUsersController } from "./controllers/loginUser/loginUser";

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

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`Rodando na porta ${port}`));
};

main();
