import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { MongoClient } from "./database/mongo";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  app.use(cors());

  await MongoClient.connect();

  app.use("/users", userRoutes);

  app.use("/products", productRoutes);

  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`Rodando na porta ${port}`));
};

main();
