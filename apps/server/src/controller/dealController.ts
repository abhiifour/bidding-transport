
import type { Request, Response } from "express";
import prisma from "../utils/db"


export async function createDeal(req: Request, res: Response): Promise<any> {
    const { bidId, transporterId, userId } = req.body;
    try {
        const deal = await prisma.deal.create({
            data: {
                bidId,
                transporterId,
                userId
            }
        });

        return res.status(200).json(deal);
        
    } catch (error) {
        return res.status(404).json(error);
    }
}

export async function logManualDeal(req: Request, res: Response): Promise<any> {
    const { transporterId, loggedById, materialType, amount, quantity, dealDate } = req.body;
    try {
        const deal = await prisma.manualDeal.create({
            data: {
                
                transporterId,
                loggedById,
                materialType,
                amount,
                quantity,
                dealDate
            }
        });

        return res.status(200).json(deal);
        
    } catch (error) {
        return res.status(404).json(error);
    }
}

export async function editManualDeal(req: Request, res: Response): Promise<any> {
    const {id, transporterId, loggedById, materialType, amount, quantity, dealDate } = req.body;
    try {
        const deal = await prisma.manualDeal.update({
            where:{
                id:id
            },
            data: {
                
                transporterId,
                loggedById,
                materialType,
                amount,
                quantity,
                dealDate
            }
        });

        return res.status(200).json(deal);
        
    } catch (error) {
        return res.status(404).json(error);
    }
}

export async function deleteManualDeal(req: Request, res: Response): Promise<any> {
    const {id } = req.params;
    try {
        const deal = await prisma.manualDeal.delete({
            where:{
                id:id
            },
            
        });

        return res.status(200).json(deal);
        
    } catch (error) {
        return res.status(404).json(error);
    }
}

export async function getAllDeals(req: Request, res: Response): Promise<any> {
  try {
    const deals = await prisma.deal.findMany();
    return res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching all deals:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function getAllManualDeals(req: Request, res: Response): Promise<any> {
  try {
    const deals = await prisma.manualDeal.findMany();
    return res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching all manual deals:", error);
    return res.status(500).send("Internal Server Error");
  }
}
