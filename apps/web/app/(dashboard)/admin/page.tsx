"use client"
import DealCard from "@/components/admin/Deals";
import { useGetDeals } from "@/hooks/useDeal";


export default function Admin(){
    const {data: deals} = useGetDeals()

    return (
        <div>
            <h1 className="text-2xl font-medium">Deals </h1>
            <div className="mt-10 grid grid-cols-3 gap-4">
                {
                    deals?.map((deal:any) => <DealCard key={deal.id} deal={deal} />)
                }
               
            </div>
        </div>
    )
}