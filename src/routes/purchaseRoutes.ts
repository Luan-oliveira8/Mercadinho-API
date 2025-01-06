import { Router } from "express";
import { CreatePurchaseController } from "../controllers/purchase/createPurchase/createPurchase";
import { MongoCreatePurchaseRepository } from "../repositories/purchase/createPurchase/mongoCreatePurchase";
import { MongoDeletePurchaseRepository } from "../repositories/purchase/deletePurchase/mongoDeletePurchase";
import { DeletePurchaseController } from "../controllers/purchase/deletePurchase/deletePurchase";

const purchaseRoutes = Router();

const mongoCreatePurchaseRepository = new MongoCreatePurchaseRepository();
const createPurchaseController = new CreatePurchaseController(
  mongoCreatePurchaseRepository
);

const mongoDeletePurchaseRepository = new MongoDeletePurchaseRepository();
const deletePurchaseController = new DeletePurchaseController(
  mongoDeletePurchaseRepository
);

purchaseRoutes.post("/register", async (req, res) => {
  const { body, statusCode } = await createPurchaseController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

purchaseRoutes.delete("/delete/:id", async (req, res) => {
  const { body, statusCode } = await deletePurchaseController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default purchaseRoutes;
