"use client"
import { useGetABidOffer } from "@/hooks/useBidOffer";
import React from "react";

export default function DealCard  ({ deal }:any) {

    const { data: bidOffer} = useGetABidOffer(deal.bidId)
    console.log(bidOffer)

    return (
    <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-white text-sm">
        <h3 className="m-0 font-semibold text-base">{bidOffer?.[0].bid?.materialType}</h3>
        <div className="text-gray-500 text-sm mb-2">
            Deal Date: {new Date(deal.createdAt).toLocaleDateString()}
        </div>
        <div>
            <strong>Amount:</strong> ₹{bidOffer?.[0].offeredPrice}
        </div>
        <div>   
            <strong>Quantity:</strong> {bidOffer?.[0].bid?.quantity}
        </div>
        <div>
            <strong>Transporter:</strong> {deal.transporter.name}
        </div>
       
    </div>)
};
