import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDeleteManualDeal, useGetManualDeals } from "@/hooks/useDeal"
import { getAllManualDeals } from "@/lib/api/deal"
import {
  Dialog,
  DialogContent,


  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical } from "lucide-react"

import { EditManualDeal } from "./EditManualDeal"

// Example data matching the ManualDeal schema


export function ManualDealsTable() {
    const {data: manualDeals} = useGetManualDeals()
    const{mutate, isError, isSuccess} = useDeleteManualDeal()
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
                {manualDeals?.slice().reverse().map((deal:any) => (
                    <TableRow key={deal.id}>
                        <TableCell>{deal.materialType}</TableCell>
                        <TableCell>{deal.quantity}</TableCell>
                        <TableCell>₹{deal.amount}</TableCell>
                        <TableCell>{new Date(deal.dealDate).toLocaleDateString()}</TableCell>
                        <TableCell>{deal?.transporter?.name}</TableCell>
                        <TableCell>{deal.loggedById}</TableCell>
                        <TableCell>{new Date(deal.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>  
                            
                            <Popover>
                                <PopoverTrigger>
                                    <EllipsisVertical size={14}/>
                                </PopoverTrigger>
                                <PopoverContent className="max-w-[100px] p-0  text-sm">
                                    <div className="cursor-pointer hover:bg-black/5 px-2 py-1 text-center">   
                                    <Dialog>
                                        <DialogTrigger className="">Edit</DialogTrigger>
                                        <DialogContent >
                                        <DialogTitle>
                                            Edit 
                                        </DialogTitle>
                                        <EditManualDeal materialType={deal.materialType} quantity={deal.quantity} amount={deal.amount} transporterId={deal.transporterId} dealDate={deal.dealDate} id={deal.id} loggedById={deal.loggedById} />
                                        </DialogContent>
                                    </Dialog>
                                    </div>
                                    <div className="cursor-pointer hover:bg-black/5 px-2 py-1 text-center" onClick={() => mutate({id: deal.id}) }>Delete</div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
