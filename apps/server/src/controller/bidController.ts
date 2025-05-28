
import type { Request, Response } from "express";
import prisma from "../utils/db"
import { predictBidPrice } from "../utils/ai-shit";

//create bid

export async function createBid(req: Request, res: Response): Promise<any> {
  const { requirement, createdById, materialType, quantity, pickupLocation, deliveryLocation, deadline  } = req.body;
  try {
    
    const amount:string | any  = await predictBidPrice(materialType,quantity,pickupLocation,deliveryLocation,deadline,requirement)
    const newBid = await prisma.bid.create({
      data: {
            requirement,
            createdById,
            materialType,
            quantity,
            pickupLocation,
            deliveryLocation,
            deadline,
            basePriceEstimate: parseFloat(amount)
        }
    }) 

   
    console.log(`Created bid:`, newBid);
    
    return res.status(201).json(newBid);
  } catch (error) {
    console.error("Error creating bid:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// delete bid 

export async function deleteBid(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  try {
    const deletedBid = await prisma.bid.delete({
      where: { id }
    });
    return res.status(200).json(deletedBid);
  } catch (error) {
    console.error("Error deleting bid:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function getAllBids(req: Request, res: Response): Promise<any> {
  try {
    const bids = await prisma.bid.findMany({
      include:{
        bidOffers: {
          include:{
            transporter: true
          }
        }
      }
    });
    return res.status(200).json(bids);
  } catch (error) {
    console.error("Error fetching all bids:", error);
    return res.status(500).send("Internal Server Error");
  }
}


