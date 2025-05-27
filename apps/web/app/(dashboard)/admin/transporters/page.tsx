import { CreateTransporterForm } from "@/components/admin/CreateTransporter";
import { CreateUserForm } from "@/components/admin/CreateUser";
import { UserTable } from "@/components/admin/StaffTable";
import { TransporterTable } from "@/components/admin/TransporterTable";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TransporterDetailPage(){
    return (
        <div>
           <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Transporter Detail Page</h1>
            <Dialog>
                <DialogTrigger className="bg-black rounded-lg text-white px-6 py-1.5 cursor-pointer">Add Transporter</DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                <DialogTitle>add a transporter</DialogTitle>
                </DialogHeader>
                <CreateTransporterForm/>
                </DialogContent>
            </Dialog>
           </div>
           <div className="mt-10">
            <TransporterTable/>
           </div>
        </div>
    );
        
}