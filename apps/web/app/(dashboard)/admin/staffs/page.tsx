"use client"
import { CreateUserForm } from "@/components/admin/CreateUser";
import { UserTable } from "@/components/admin/StaffTable";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGetUsers } from "@/hooks/useUser";

export default function StaffsDetailPage(){

    return (
        <div>
           <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Staffs Detail Page</h1>
          <Dialog>
                <DialogTrigger className="bg-black rounded-lg text-white px-6 py-1.5 cursor-pointer">Add User</DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                <DialogTitle>Create a user</DialogTitle>
                </DialogHeader>
                <CreateUserForm/>
                </DialogContent>
                </Dialog>
           </div>
           <div className="mt-10">
            <UserTable/>
           </div>
        </div>
    );
        
}