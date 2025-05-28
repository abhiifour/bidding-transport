import { Router } from "express";
import { createBidOffer, getABidOffer, getBidOffers, updateBidOffer } from "../controller/bidOfferControler";

const bidOfferRouter = Router()

bidOfferRouter.post("/create", createBidOffer)
bidOfferRouter.post("/update", updateBidOffer)
bidOfferRouter.get("/get/:bidId", getBidOffers)
bidOfferRouter.get("/get/accepted/:bidId", getABidOffer)

export default bidOfferRouter;