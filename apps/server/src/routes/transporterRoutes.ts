import { Router } from "express";

import { createTransporter, deleteTransporter, editTransporter, getAllTransporter } from "../controller/transporterController";

const transporterRouter = Router()

transporterRouter.post("/create", createTransporter)
transporterRouter.post("/edit", editTransporter)
transporterRouter.delete("/remove", deleteTransporter)
transporterRouter.get("/get", getAllTransporter)

export default transporterRouter;

