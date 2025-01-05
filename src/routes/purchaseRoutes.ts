import { Router } from "express";
import { CreatePurchaseController } from "../controllers/purchase/createPurchase/createPurchase";
import { MongoCreatePurchaseRepository } from "../repositories/purchase/createPurchase/mongocreatePurchase";

const purchaseRoutes = Router();

const mongoCreatePurchaseRepository = new MongoCreatePurchaseRepository();
const createPurchaseController = new CreatePurchaseController(
  mongoCreatePurchaseRepository
);

purchaseRoutes.post("/register", async (req, res) => {
  const { body, statusCode } = await createPurchaseController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export default purchaseRoutes;
