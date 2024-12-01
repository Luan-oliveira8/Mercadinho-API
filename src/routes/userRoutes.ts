import { Router } from "express";
import { CreateUserController } from "../controllers/user/createUser/createUser";
import { GetUsersController } from "../controllers/user/getUsers/getUsers";
import { MongoCreateUserRepository } from "../repositories/user/creaateUser/mongoCreateUser";
import { MongoGetUsersRepository } from "../repositories/user/getUsers/mongoGetUsers";
import { MongoUpdateUserRepository } from "../repositories/user/updateUser/mongoUpdateUser";
import { UpdateUserController } from "../controllers/user/updateUser/updateUser";
import { MongoDeleteUserRepository } from "../repositories/user/deleteUser/mongoDeleteUser";
import { DeleteUserController } from "../controllers/user/deleteUser/deleteUser";
import { MongoLoginRepository } from "../repositories/user/loginUser/mongoLogin";
import { LoginUsersController } from "../controllers/user/loginUser/loginUser";

const userRoutes = Router();

const mongoCreateUserRepository = new MongoCreateUserRepository();
const createUserController = new CreateUserController(mongoCreateUserRepository);

const mongoDeleteUserRepository = new MongoDeleteUserRepository();
const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);

const mongoGetUsersRepository = new MongoGetUsersRepository();
const getUsersController = new GetUsersController(mongoGetUsersRepository);

const mongoUpdateUserRepository = new MongoUpdateUserRepository();
const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

const mongoLoginRepository = new MongoLoginRepository();
const loginUsersController = new LoginUsersController(mongoLoginRepository);

userRoutes.get("/", async (req, res) => {

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  userRoutes.post("/", async (req, res) => {

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  userRoutes.patch("/:id", async (req, res) => {

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  userRoutes.delete("/:id", async (req, res) => {

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  userRoutes.post("/login", async (req, res) => {

    const { body, statusCode } = await loginUsersController.handle({
      params: req.body,
    });

    res.status(statusCode).send(body);
  });

  export default userRoutes;