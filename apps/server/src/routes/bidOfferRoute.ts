import { Router } from "express";
import { createBidOffer, updateBidOffer } from "../controller/bidOfferControler";

const bidOfferRouter = Router()

bidOfferRouter.post("/create", createBidOffer)
bidOfferRouter.post("/update", updateBidOffer)

export default bidOfferRouter;