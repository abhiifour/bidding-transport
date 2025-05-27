import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EllipsisVertical } from "lucide-react"

// Example data matching the ManualDeal schema
const manualDeals = [
    {
        id: "1",
        transporter: { name: "TransCo" },
        loggedBy: { name: "Alice" },
        materialType: "Steel",
        amount: 120000,
        quantity: 100,
        dealDate: new Date("2024-07-01"),
        createdAt: new Date("2024-06-01"),
    },
    {
        id: "2",
        transporter: { name: "MoveFast" },
        loggedBy: { name: "Bob" },
        materialType: "Cement",
        amount: 50000,
        quantity: 50,
        dealDate: new Date("2024-07-10"),
        createdAt: new Date("2024-06-05"),
    },
]

export function ManualDealsTable() {
    return (
        <Table>
            <TableCaption>A list of your recent manual deals.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Deal Date</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead>Logged By</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {manualDeals.map((deal) => (
                    <TableRow key={deal.id}>
                        <TableCell>{deal.materialType}</TableCell>
                        <TableCell>{deal.quantity}</TableCell>
                        <TableCell>₹{deal.amount}</TableCell>
                        <TableCell>{deal.dealDate.toLocaleDateString()}</TableCell>
                        <TableCell>{deal.transporter.name}</TableCell>
                        <TableCell>{deal.loggedBy.name}</TableCell>
                        <TableCell>{deal.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell><EllipsisVertical size={14}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
