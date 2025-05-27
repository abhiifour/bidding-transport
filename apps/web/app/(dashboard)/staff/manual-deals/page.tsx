"use client"
import { CreateManualDeal } from "@/components/CreateManualDeal";
import { ManualDealsTable } from "@/components/ManualDealsTable";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ManualDeal(){
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium">Manual deals</h1>
                <Dialog>
                <DialogTrigger className="bg-black rounded-lg text-white px-6 py-1.5 cursor-pointer">Create</DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                <DialogTitle>Log a manual deal</DialogTitle>
                </DialogHeader>
                <CreateManualDeal/>
                </DialogContent>
                </Dialog>
            </div>

            <div className="mt-10">
                <ManualDealsTable/>
            </div>
        </div>
    )
}