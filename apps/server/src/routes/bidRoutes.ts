
import { Router } from "express";

import { createBid, deleteBid, getAllBids } from "../controller/bidController";

const bidRouter = Router()

bidRouter.post("/create", createBid)
bidRouter.delete("/remove", deleteBid)
bidRouter.get("/get", getAllBids)


export default bidRouter;