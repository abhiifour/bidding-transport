import { Router } from "express";
import { createDeal, deleteManualDeal, editManualDeal, getAllDeals, getAllManualDeals, logManualDeal } from "../controller/dealController";

const dealRouter = Router()

dealRouter.post("/create", createDeal)
dealRouter.post("/manual/log", logManualDeal)
dealRouter.delete("/manual/remove/:id", deleteManualDeal)
dealRouter.post("/manual/edit", editManualDeal)
dealRouter.get("/manual/get", getAllManualDeals)
dealRouter.get("/get", getAllDeals)
export default dealRouter;


