import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers";

config();

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Rodando na porta ${port}`));

app.get("/", (req, res) => {
  res.send("Teste");
});

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});
