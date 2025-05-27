"use client"
import { useParams } from 'next/navigation'
import { BidOfferList } from '@/components/BidOfferList'

export default function BidPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Bid Offers</h1>
            <BidOfferList bidId={useParams().bidId as string} />
        </div>
    )
}