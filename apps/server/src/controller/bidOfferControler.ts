import type { Request, Response } from "express";
import prisma from "../utils/db"


export async function createBidOffer( req: Request, res: Response): Promise<any> {
    
    const {bidId, transporterId, offeredPrice, message, offerDate  } = req.body;
    try {
        const bidOffer = await prisma.bidOffer.create({
            data:{
                bidId,
                transporterId,
                offeredPrice,
                offerDate,
                message
            }
        })

        return res.status(200).json(bidOffer)
        
    } catch (error) {
        console.log("error creating bid offer:" , error)
        return res.status(404).json(error)
    }
}

export async function updateBidOffer( req: Request, res: Response): Promise<any> {
    
    const {status, id} = req.body;
    try {
        const bidOffer = await prisma.bidOffer.update({
            where:{
               id: id
            },
            data:{
                status
            }
        })

        if(status === "accepted"){
            const bid = await prisma.bid.update({
                where:{
                    id: bidOffer.bidId
                },
                data:{
                    status: "accepted"
                }
            })

            if(bid){
                await prisma.deal.create({
                data:{
                    transporterId: bidOffer.transporterId,
                    bidId: bidOffer.bidId,
                    userId: bid?.createdById,


                }
            })
            }
        }

        return res.status(200).json(bidOffer)
        
    } catch (error) {
        console.log("error updating bid offer:", error)
        return res.status(404).json(error)
    }
}


export async function getBidOffers( req: Request, res: Response): Promise<any> {
    
    const {bidId} = req.params;
    try {
        const bidOffers = await prisma.bidOffer.findMany({
            where: {
                bidId
            },
            include:{
                transporter:true
            }
        })
        return res.status(200).json(bidOffers)

    } catch (error) {
        console.log("error fetching bid offers:" , error)
        return res.status(404).json(error)
    }
}


export async function getABidOffer( req: Request, res: Response): Promise<any> {
    
    const {bidId} = req.params;
    try {
        const bidOffer = await prisma.bidOffer.findMany({
            where: {
                bidId,
                status:"accepted"
            },
            include:{
                bid:true
            }
        })
        return res.status(200).json(bidOffer)

    } catch (error) {
        console.log("error fetching bid offer:" , error)
        return res.status(404).json(error)
    }
}
