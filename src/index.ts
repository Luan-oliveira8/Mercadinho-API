import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Rodando na porta ${port}`));

app.get("/", (req, res) => {
  res.send("Teste");
});
