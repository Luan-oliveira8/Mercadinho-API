import { Router } from "express";
import { CreatePurchaseController } from "../controllers/purchase/createPurchase/createPurchase";
import { MongoCreatePurchaseRepository } from "../repositories/purchase/createPurchase/mongoCreatePurchase";
import { MongoDeletePurchaseRepository } from "../repositories/purchase/deletePurchase/mongoDeletePurchase";
import { DeletePurchaseController } from "../controllers/purchase/deletePurchase/deletePurchase";
import { MongoGetPurchasesRepository } from "../repositories/purchase/getPurchases/MongoGetPurchases";
import { GetPurchasesController } from "../controllers/purchase/getPurchase/getPurchases";
import { MongoUpdatePurchaseRepository } from "../repositories/purchase/updatePurchase/MongoUpdatePurchase";
import { UpdatePurchaseController } from "../controllers/purchase/updatePurchase/updateProduct";

const purchaseRoutes = Router();

const mongoCreatePurchaseRepository = new MongoCreatePurchaseRepository();
const createPurchaseController = new CreatePurchaseController(
  mongoCreatePurchaseRepository
);

const mongoDeletePurchaseRepository = new MongoDeletePurchaseRepository();
const deletePurchaseController = new DeletePurchaseController(
  mongoDeletePurchaseRepository
);

const mongoGetPurchasesRepository = new MongoGetPurchasesRepository();
const getPurchasesController = new GetPurchasesController(
  mongoGetPurchasesRepository
);

const mongoUpdatePurchaseRepository = new MongoUpdatePurchaseRepository();
const updatePurchaseController = new UpdatePurchaseController(
  mongoUpdatePurchaseRepository
);

purchaseRoutes.post("/register-and-update-stock", async (req, res) => {
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

purchaseRoutes.get("/", async (req, res) => {
  const { body, statusCode } = await getPurchasesController.handle();

  res.status(statusCode).send(body);
});

purchaseRoutes.patch("/edit/:id", async (req, res) => {
  const { body, statusCode } = await updatePurchaseController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default purchaseRoutes;
