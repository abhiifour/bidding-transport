"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetBids } from "@/hooks/useBid"
import { useRouter } from "next/navigation"

// Example data matching the Bid schema
// const bids = [
//     {
//         id: "1",
//         createdBy: { name: "Alice" },
//         materialType: "Steel",
//         quantity: 100,
//         pickupLocation: "Delhi",
//         deliveryLocation: "Mumbai",
//         deadline: new Date("2024-07-01"),
//         basePriceEstimate: 50000,
//         status: "open",
//         createdAt: new Date("2024-06-01"),
//         requirement: "Urgent delivery",
//     },
//     {
//         id: "2",
//         createdBy: { name: "Bob" },
//         materialType: "Cement",
//         quantity: 50,
//         pickupLocation: "Chennai",
//         deliveryLocation: "Bangalore",
//         deadline: new Date("2024-07-10"),
//         basePriceEstimate: 20000,
//         status: "closed",
//         createdAt: new Date("2024-06-05"),
//         requirement: "",
//     },
// ]

export function BidTable() {
    const { data: bids} = useGetBids()
    console.log(bids)
    const router = useRouter()

    return (
        <Table>
            <TableCaption>A list of your recent bids.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Status</TableHead>
                   
                </TableRow>
            </TableHeader>
            <TableBody>
                {bids?.slice().reverse().map((bid : any) => (
                    <TableRow key={bid.id} onClick={() => router.push(`staff/bids/${bid.id}`)} className="cursor-pointer">
                        <TableCell>{bid.materialType}</TableCell>
                        <TableCell>{bid.quantity}</TableCell>
                        <TableCell>{bid.pickupLocation}</TableCell>
                        <TableCell>{bid.deliveryLocation}</TableCell>
                        <TableCell>{new Date(bid.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>
                            {bid.basePriceEstimate ? `₹${bid.basePriceEstimate}` : "-"}
                        </TableCell>
                        <TableCell className={`${bid.status === "accepted" && "text-green-600" } ${bid.status === "open" && "text-yellow-600"}`}>{bid.status}</TableCell>
             
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
