import type { Request, Response } from "express";
import { superAdmin } from "../auth";
import prisma from "../utils/db"


export async function createTransporter(req: Request, res: Response):Promise<any>{
    const {name, contact, vehicleType, capacity} = req.body;

    try {
        const transporter = await prisma.transporter.create({
            data:{
                name,
                contact,
                capacity,
                vehicleType
            }
        })
        return res.status(200).json(transporter)
    } catch (error) {
        return res.status(404).send(error)
    }
}


export async function editTransporter(req: Request, res: Response):Promise<any>{
    const {name, contact, vehicleType, capacity, id, status} = req.body;

    try {
        const transporter = await prisma.transporter.update({
            where:{
                id:id
            },
            data:{
                name,
                contact,
                capacity,
                vehicleType,
                status
            }
        })
        return res.status(200).json(transporter)
    } catch (error) {
        console.error("Error editing transporter:", error);
        return res.status(404).send(error)
    }
}


export async function deleteTransporter(req: Request, res: Response):Promise<any>{
    const {id} = req.body;

    try {
        const transporter = await prisma.transporter.delete({
            where:{
              id:id
            }
        })
        return res.status(200).json({"message": "transporter deleted"})
    } catch (error) {
        return res.status(404).send(error)
    }
}


export async function getAllTransporter(req: Request, res: Response):Promise<any>{
   

    try {
        const transporters = await prisma.transporter.findMany({
            include: {
                bidOffers: true,
                manualDeals: true,
            },
        })
        return res.status(200).json(transporters)
    } catch (error) {
        console.error("Error fetching transporters:", error);
        return res.status(404).send(error)
    }
}