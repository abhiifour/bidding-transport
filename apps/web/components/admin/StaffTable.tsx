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
import { useDeleteUser, useGetUsers } from "@/hooks/useUser"
import { ResetUserForm } from "./resetUserForm"


// Example data matching the User schema
// const users = [
//     {
//         id: "1",
//         uid: "user-001",
//         email: "alice@example.com",
//         role: "ADMIN",
//         createdAt: new Date("2024-06-01"),
//     },
//     {
//         id: "2",
//         uid: "user-002",
//         email: "bob@example.com",
//         role: "STAFF",
//         createdAt: new Date("2024-06-05"),
//     },
// ]

export function UserTable() {
    const {data : users} = useGetUsers()
    const {mutate , isError, isPending, isSuccess} = useDeleteUser()
    // console.log(users)


    return (
        <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>UID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user:any) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.uid}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                        <Popover>
                        <PopoverTrigger><EllipsisVertical size={14}/></PopoverTrigger>
                        
                                <PopoverContent className="max-w-[100px] p-0  text-sm">
                                    <div className="cursor-pointer hover:bg-black/5 px-2 py-1 text-center">   
                                    <Dialog>
                                        <DialogTrigger className="">Edit</DialogTrigger>
                                        <DialogContent >
                                        <DialogTitle>
                                            Edit 
                                        </DialogTitle>
                                        <ResetUserForm email={user?.email} />
                                        </DialogContent>
                                    </Dialog>
                                    </div>
                                    <p className="cursor-pointer hover:bg-black/5 px-2 py-1 text-center" onClick={() => {mutate({email: user?.email})}} >Delete</p>

                        </PopoverContent>
                        </Popover>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
