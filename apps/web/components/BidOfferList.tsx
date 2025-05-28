'use client'

import { useGetBidOffers, useUpdateBidOffer } from "@/hooks/useBidOffer"
import { useEffect, useState } from "react"


type BidOffer = {
id: string
transporterId: string
offeredPrice: number
offerDate: string
message?: string
status: 'pending' | 'accepted' | 'rejected'
transporter: {
    name: string
}
}

// Mock data for development/testing
// const mockOffers: BidOffer[] = [
//   {
//     id: "1",
//     transporterId: "t1",
//     offeredPrice: 1200,
//     offerDate: new Date().toISOString(),
//     message: "Can deliver within 2 days.",
//     status: "pending",
//     transporter: { name: "TransCo Express" }
//   },
//   {
//     id: "2",
//     transporterId: "t2",
//     offeredPrice: 1150,
//     offerDate: new Date(Date.now() - 86400000).toISOString(),
//     message: "Best price, quick delivery.",
//     status: "accepted",
//     transporter: { name: "Speedy Movers" }
//   },
//   {
//     id: "3",
//     transporterId: "t3",
//     offeredPrice: 1300,
//     offerDate: new Date(Date.now() - 2 * 86400000).toISOString(),
//     status: "rejected",
//     transporter: { name: "Budget Transport" }
//   }
// ]

export function BidOfferList({ bidId }: { bidId: string }) {

const {data: bidOffers} = useGetBidOffers(bidId)
const {mutate, isError} = useUpdateBidOffer()
const [offers, setOffers] = useState<BidOffer[]>([])
const [loading, setLoading] = useState(true)

if(bidOffers && bidOffers.length > 0) {
return (
    <div className="grid gap-4 mt-4">
        {bidOffers?.slice().reverse().map((offer:BidOffer) => (
            <div
                key={offer.id}
                className="border rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center justify-between bg-white gap-1"
            >
                <div className="flex-1 text-sm">
                    <div className="font-semibold text-sm mb-1">{offer.transporter.name.toUpperCase()}</div>
                    <div className="text-gray-600">
                        <span className="font-medium">Offered Price:</span> ₹{offer.offeredPrice}
                    </div>
                    <div className="text-gray-600">
                        <span className="font-medium">Offer Date:</span> {new Date(offer.offerDate).toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                        <span className="font-medium">Message:</span> {offer.message || "-"}
                    </div>
                    <div className="mt-1">
                        <span
                            className={`inline-block px-2 py-1 rounded text-xs capitalize ${
                                offer.status === "accepted"
                                    ? "bg-green-100 text-green-700"
                                    : offer.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {offer.status}
                        </span>
                    </div>
                </div>
              {
                offer.status === "pending" && (
                      <div className="flex gap-2 mt-4 md:mt-0 md:ml-6">
                    <button
                        className="px-4 py-2 rounded-lg text-sm bg-green-600/60 text-white disabled:opacity-50"
                        disabled={offer.status !== "pending"}
                        onClick={() => mutate({ id: offer.id, status: "accepted", bidId: bidId})}
                    >
                        Accept
                    </button>
                    <button
                        className="px-4 py-2  bg-red-600/60 text-white text-sm rounded-lg disabled:opacity-50"
                        disabled={offer.status !== "pending"}
                          onClick={() => mutate({ id: offer.id, status: "rejected", bidId: bidId})}
                    >
                        Reject
                    </button>
                </div>
                )
              }
            </div>
        ))}
    </div>
)
}
else return (
    <div className="text-gray-500 text-center mt-50">No bid offers found</div>
)
}