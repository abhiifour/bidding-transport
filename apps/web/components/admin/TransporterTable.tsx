"use client"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateTransporterForm } from "./CreateTransporter"
import { useDeleteTransporter, useGetTransporter } from "@/hooks/useTransporter"
import { useDeleteUser } from "@/hooks/useUser"
import { EditTransporterForm } from "./EditTransporterForm"

// Example data matching the Transporter schema
// const transporters = [
//     {
//         id: "1",
//         name: "TranspoX",
//         contact: "9876543210",
//         vehicleType: "Truck",
//         capacity: 20.5,
//         status: "active",
//         createdAt: new Date("2024-06-01"),
//     },
//     {
//         id: "2",
//         name: "MoveIt",
//         contact: "9123456780",
//         vehicleType: "Van",
//         capacity: 10,
//         status: "inactive",
//         createdAt: new Date("2024-06-05"),
//     },
// ]

export function TransporterTable() {

    const {data : transporters} = useGetTransporter()
    const {mutate, isError, isPending, isSuccess} = useDeleteTransporter()
    return (
        <Table>
            <TableCaption>A list of transporters.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Vehicle Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transporters?.map((transporter : any) => (
                    <TableRow key={transporter.id}>
                        <TableCell>{transporter.id}</TableCell>
                        <TableCell>{transporter.name}</TableCell>
                        <TableCell>{transporter.contact ?? "-"}</TableCell>
                        <TableCell>{transporter.vehicleType ?? "-"}</TableCell>
                        <TableCell>{transporter.capacity ?? "-"}</TableCell>
                        <TableCell>{transporter.status}</TableCell>
                        <TableCell>{new Date(transporter.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger>
                                    <EllipsisVertical size={14}/>
                                </PopoverTrigger>
                                <PopoverContent className="max-w-[100px] p-0">
                                    <p className="cursor-pointer hover:bg-black/5 px-2 py-1 text-center">   <Dialog>
                                        <DialogTrigger className="">Edit</DialogTrigger>
                                        <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                        <DialogTitle>Edit a transporter</DialogTitle>
                                        </DialogHeader>
                                        <EditTransporterForm
                                            name={transporter.name}
                                            contact={transporter.contact}
                                            vehicleType={transporter.vehicleType}
                                            capacity={transporter.capacity}
                                            status={transporter.status}
                                            id={transporter.id}
                                        />
                                        </DialogContent>
                                    </Dialog>
                                    </p>
                                    <p className="cursor-pointer hover:bg-black/5 px-2 py-1 text-center" onClick={() => mutate({id: transporter.id})}>Delete</p>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
